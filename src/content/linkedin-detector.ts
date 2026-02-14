// LinkedIn profile detector and "Call" button injector

import { createModal } from './modal';

console.log('Love Dial: LinkedIn detector loaded');

interface LinkedInProfile {
  name: string;
  headline: string;
  about: string;
  experience: string[];
  imageUrl: string;
  url: string;
}

// Extract profile data from LinkedIn page
function extractProfileData(): LinkedInProfile | null {
  try {
    console.log('Love Dial: Starting profile extraction...');
    console.log('Love Dial: Current URL:', window.location.href);
    
    // Wait a bit for LinkedIn to fully load (they use React/SPA)
    // Try multiple times with different selectors
    
    let name = 'Unknown';
    let headline = '';
    let about = '';
    let imageUrl = '';
    const experience: string[] = [];
    
    // ===== NAME EXTRACTION =====
    // Try many different selectors for name (including new LinkedIn structure)
    const nameSelectors = [
      'h2.eb7256ab.f6497d59', // New LinkedIn structure
      'h2[class*="eb7256ab"][class*="f6497d59"]', // Partial class match
      'h2.eb7256ab', // Just the base class
      'h1.text-heading-xlarge',
      'h1[data-anonymize="person-name"]',
      'h1.break-words',
      'main h1',
      'h1.pv-text-details__left-panel',
      '.pv-text-details__left-panel h1',
      '.top-card-layout__title',
      '.ph5.pb5 h1',
      'h1[class*="text-heading"]',
      '.pv-text-details__left-panel-inner h1',
      'h1',
      'h2' // Fallback to any h2
    ];
    
    for (const selector of nameSelectors) {
      const el = document.querySelector(selector);
      if (el) {
        const text = el.textContent?.trim();
        // Filter out common non-name text
        if (text && text.length > 0 && text !== 'Unknown' && 
            !text.includes('connections') && !text.includes('mutual') &&
            text.length < 100) { // Reasonable name length
          name = text;
          console.log('Love Dial: Found name with selector:', selector, '=', name);
          break;
        }
      }
    }
    
    // Fallback: Try to get from page title or URL
    if (name === 'Unknown') {
      const title = document.title;
      if (title) {
        const match = title.match(/^([^|]+)/);
        if (match) {
          name = match[1].trim();
          console.log('Love Dial: Got name from title:', name);
        }
      }
    }
    
    // ===== HEADLINE EXTRACTION =====
    const headlineSelectors = [
      'p.eb7256ab.e20eaab1', // New LinkedIn structure - headline class
      'p[class*="eb7256ab"][class*="e20eaab1"]', // Partial match
      'p.eb7256ab.e20eaab1._3da5b139', // With more classes
      '.text-body-medium.break-words',
      '[data-anonymize="headline"]',
      '.pv-text-details__left-panel .text-body-medium',
      '.ph5.pb5 .text-body-medium',
      '.top-card-layout__headline',
      '.pv-text-details__left-panel-inner .text-body-medium',
      '.pv-top-card-section__headline',
      '[class*="headline"]'
    ];
    
    for (const selector of headlineSelectors) {
      const el = document.querySelector(selector);
      if (el) {
        const text = el.textContent?.trim();
        if (text && text.length > 5 && text.length < 300) { // Reasonable headline length
          headline = text;
          console.log('Love Dial: Found headline with selector:', selector, '=', headline);
          break;
        }
      }
    }
    
    // Fallback: Try to get from any text near the name (new structure)
    if (!headline || headline.length === 0) {
      // Try after h2 name (new LinkedIn structure)
      const nameEl = document.querySelector('h2.eb7256ab, h1');
      if (nameEl) {
        // Look for next sibling paragraph
        let nextSibling = nameEl.nextElementSibling;
        let attempts = 0;
        while (nextSibling && attempts < 5) {
          if (nextSibling.tagName === 'P') {
            const text = nextSibling.textContent?.trim();
            if (text && text.length > 10 && text.length < 300 && 
                !text.includes('connections') && !text.includes('mutual') &&
                !text.includes('·')) { // Filter out connection counts
              headline = text;
              console.log('Love Dial: Found headline from sibling:', headline);
              break;
            }
          }
          nextSibling = nextSibling.nextElementSibling;
          attempts++;
        }
      }
    }
    
    // ===== ABOUT SECTION =====
    const aboutSelectors = [
      '#about ~ .pvs-list__outer-container',
      '[data-section="summary"]',
      '#about',
      'section[data-section="summary"]',
      '.pv-about-section .pv-about__summary-text',
      '.pv-about-section',
      '[id*="about"]',
      '.artdeco-card[data-section="summary"]',
      // New LinkedIn structure - look for "About" section
      'section:has(h2:contains("About"))',
      'div[data-section="summary"]',
      // Try to find section with "About" text
      ...Array.from(document.querySelectorAll('section, div')).filter(el => {
        const heading = el.querySelector('h2, h3');
        return heading && heading.textContent?.toLowerCase().includes('about');
      }).map(el => el.querySelector('p, div')?.textContent || '').filter(Boolean)
    ];
    
    for (const selector of aboutSelectors) {
      try {
        const el = typeof selector === 'string' ? document.querySelector(selector) : null;
        if (el) {
          const text = el.textContent?.trim();
          if (text && text.length > 10) { // At least some content
            about = text;
            console.log('Love Dial: Found about section, length:', about.length);
            break;
          }
        }
      } catch (e) {
        // Skip invalid selectors
      }
    }
    
    // Fallback: Search for "About" text and get following content
    if (!about || about.length < 10) {
      const aboutHeaders = Array.from(document.querySelectorAll('h2, h3')).filter(h => 
        h.textContent?.toLowerCase().includes('about')
      );
      if (aboutHeaders.length > 0) {
        const aboutSection = aboutHeaders[0].closest('section, div');
        if (aboutSection) {
          const text = aboutSection.textContent?.trim();
          if (text && text.length > 20) {
            about = text;
            console.log('Love Dial: Found about by searching for "About" header');
          }
        }
      }
    }
    
    // ===== EXPERIENCE =====
    const expSelectors = [
      '[data-section="experience"] .t-14.t-normal',
      '.pvs-list__outer-container [data-section="experience"] .t-14',
      '.pv-profile-section__card-item-v2',
      '[data-section="experience"]'
    ];
    
    for (const selector of expSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach((el, idx) => {
          if (idx < 3) {
            const text = el.textContent?.trim();
            if (text && text.length > 5) {
              experience.push(text);
            }
          }
        });
        if (experience.length > 0) break;
      }
    }
    console.log('Love Dial: Found experience items:', experience.length);
    
    // ===== PROFILE IMAGE =====
    const imageSelectors = [
      'img[data-anonymize="person-photo"]',
      '.pv-top-card-profile-picture__image',
      'img[alt*="profile"]',
      '.pv-top-card-profile-picture img',
      'img.profile-photo-edit__preview',
      '.pv-top-card__photo img',
      'img[class*="profile"]'
    ];
    
    for (const selector of imageSelectors) {
      const el = document.querySelector(selector) as HTMLImageElement;
      if (el && el.src) {
        imageUrl = el.src;
        console.log('Love Dial: Found image URL');
        break;
      }
    }
    
    // Get profile URL
    const url = window.location.href;
    
    // More lenient: accept if we have name OR headline
    if (name && name !== 'Unknown' && name.length > 0) {
      const profile = {
        name,
        headline: headline || 'No headline available',
        about: about.substring(0, 500) || 'No about section available',
        experience: experience.length > 0 ? experience : ['No experience listed'],
        imageUrl,
        url
      };
      console.log('Love Dial: ✅ Profile extracted successfully:', profile);
      return profile;
    } else {
      // Debug: log what we found
      console.warn('Love Dial: ❌ Could not extract name. Debug info:', {
        nameFound: name,
        headlineFound: headline,
        h1Count: document.querySelectorAll('h1').length,
        h1Texts: Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim()).filter(Boolean),
        url: window.location.href,
        pageTitle: document.title
      });
    }
  } catch (error) {
    console.error('Love Dial: Error extracting profile:', error);
    console.error('Love Dial: Error stack:', error instanceof Error ? error.stack : 'No stack');
  }

  console.error('Love Dial: Profile extraction failed - returning null');
  return null;
}

// Inject "Call" button into LinkedIn page
function injectCallButton() {
  // Remove existing button if present
  const existingButton = document.querySelector('.love-dial-call-button');
  if (existingButton) {
    existingButton.remove();
  }

  // Create button
  const button = document.createElement('button');
  button.className = 'love-dial-call-button';
  button.innerHTML = `
    <span class="button-icon">💕</span>
    <span class="button-text">Call</span>
  `;

  // Add click handler
  button.addEventListener('click', async (e) => {
    console.log('Love Dial: Call button clicked!');
    e.stopPropagation();
    
    button.classList.add('loading');
    button.innerHTML = '<span class="love-dial-spinner"></span> <span class="button-text">Loading...</span>';

    try {
      // Extract profile data
      console.log('Love Dial: Attempting to extract profile data...');
      const profile = extractProfileData();
      
      if (profile) {
        console.log('Love Dial: Profile extracted successfully:', profile);
        
        // Store profile in storage for popup
        await chrome.storage.local.set({ currentProfile: profile });
        console.log('Love Dial: Profile stored in chrome.storage');
        
        // Send profile to background script
        chrome.runtime.sendMessage({
          type: 'PROFILE_DETECTED',
          profile
        }, (response) => {
          console.log('Love Dial: Profile sent to background, response:', response);
        });

        // Create and show modal
        console.log('Love Dial: Creating modal...');
        try {
          const modal = createModal(profile);
          console.log('Love Dial: Modal created successfully');
          setupModalButtons(modal, profile);
        } catch (modalError) {
          console.error('Love Dial: Error creating modal:', modalError);
          button.innerHTML = '<span class="button-icon">❌</span> <span class="button-text">Modal Error</span>';
          setTimeout(() => {
            button.classList.remove('loading');
            button.innerHTML = `
              <span class="button-icon">💕</span>
              <span class="button-text">Call</span>
            `;
          }, 2000);
          return;
        }
        
        // Reset button
        button.classList.remove('loading');
        button.innerHTML = `
          <span class="button-icon">💕</span>
          <span class="button-text">Call</span>
        `;
      } else {
        console.error('Love Dial: Failed to extract profile data - profile is null');
        // Try to get at least something from the page
        const fallbackName = document.title.split('|')[0]?.trim() || 
                            window.location.pathname.split('/').pop()?.replace(/-/g, ' ') || 
                            'Unknown Profile';
        
        console.log('Love Dial: Trying fallback profile with name:', fallbackName);
        
        // Create a minimal profile as fallback
        const fallbackProfile = {
          name: fallbackName,
          headline: 'Profile information unavailable',
          about: 'Unable to extract profile details from this page.',
          experience: [],
          imageUrl: '',
          url: window.location.href
        };
        
        // Store and show modal anyway
        await chrome.storage.local.set({ currentProfile: fallbackProfile });
        chrome.runtime.sendMessage({
          type: 'PROFILE_DETECTED',
          profile: fallbackProfile
        });
        
        try {
          const modal = createModal(fallbackProfile);
          setupModalButtons(modal, fallbackProfile);
          
          button.classList.remove('loading');
          button.innerHTML = `
            <span class="button-icon">💕</span>
            <span class="button-text">Call</span>
          `;
        } catch (modalError) {
          console.error('Love Dial: Error creating modal:', modalError);
          button.innerHTML = '<span class="button-icon">❌</span> <span class="button-text">Modal Error</span>';
          setTimeout(() => {
            button.classList.remove('loading');
            button.innerHTML = `
              <span class="button-icon">💕</span>
              <span class="button-text">Call</span>
            `;
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Love Dial: Error in button click handler:', error);
      console.error('Love Dial: Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack',
        url: window.location.href
      });
      
      // Show more helpful error message
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      button.innerHTML = `<span class="button-icon">❌</span> <span class="button-text">Error: ${errorMsg.substring(0, 20)}</span>`;
      setTimeout(() => {
        button.classList.remove('loading');
        button.innerHTML = `
          <span class="button-icon">💕</span>
          <span class="button-text">Call</span>
        `;
      }, 3000);
    }
  });
  
  // Helper function to setup modal buttons
  function setupModalButtons(modal: HTMLElement, profile: LinkedInProfile) {
    // Wait a bit for modal to be fully in DOM
    setTimeout(() => {
      const voiceBtn = document.getElementById('love-dial-voice-btn');
      const scoreBtn = document.getElementById('love-dial-score-btn');
      const resultsContainer = document.getElementById('love-dial-results');
      
      console.log('Love Dial: Setting up button handlers...', { 
        voiceBtn: !!voiceBtn, 
        scoreBtn: !!scoreBtn,
        resultsContainer: !!resultsContainer,
        modal: !!modal
      });
      
      if (!voiceBtn) {
        console.error('Love Dial: Voice button not found!');
      }
      if (!scoreBtn) {
        console.error('Love Dial: Score button not found!');
      }
      
      if (voiceBtn) {
        // Remove any existing listeners
        const newVoiceBtn = voiceBtn.cloneNode(true);
        voiceBtn.parentNode?.replaceChild(newVoiceBtn, voiceBtn);
        
        newVoiceBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Love Dial: Voice button clicked!');
          
          const btn = newVoiceBtn as HTMLButtonElement;
          btn.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span> Generating...';
          btn.disabled = true;
          
          // Call background script to generate voice
          try {
            chrome.runtime.sendMessage({
              type: 'GENERATE_VOICE',
              profile
            }, (response) => {
              console.log('Love Dial: Voice generation response:', response);
              
              if (chrome.runtime.lastError) {
                console.error('Love Dial: Chrome runtime error:', chrome.runtime.lastError);
                if (resultsContainer) {
                  resultsContainer.innerHTML = `<p style="color: #c33;">Error: ${chrome.runtime.lastError.message}</p>`;
                }
                btn.innerHTML = '🎤 Generate Voice Preview';
                btn.disabled = false;
                return;
              }
              
              if (response && response.audioUrl) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = response.audioUrl;
                audio.style.cssText = 'width: 100%; margin-top: 12px;';
                if (resultsContainer) {
                  resultsContainer.innerHTML = '<h4 style="margin: 0 0 8px 0;">Voice Preview:</h4>';
                  resultsContainer.appendChild(audio);
                }
              } else {
                if (resultsContainer) {
                  resultsContainer.innerHTML = `<p style="color: #c33;">Failed to generate voice. ${response?.error || 'Please check API key.'}</p>`;
                }
              }
              btn.innerHTML = '🎤 Generate Voice Preview';
              btn.disabled = false;
            });
          } catch (error) {
            console.error('Love Dial: Error sending voice message:', error);
            if (resultsContainer) {
              resultsContainer.innerHTML = `<p style="color: #c33;">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>`;
            }
            btn.innerHTML = '🎤 Generate Voice Preview';
            btn.disabled = false;
          }
        });
      }
      
      if (scoreBtn) {
        // Remove any existing listeners
        const newScoreBtn = scoreBtn.cloneNode(true);
        scoreBtn.parentNode?.replaceChild(newScoreBtn, scoreBtn);
        
        newScoreBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Love Dial: Score button clicked!');
          
          const btn = newScoreBtn as HTMLButtonElement;
          btn.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span> Analyzing...';
          btn.disabled = true;
          
          // Call background script to generate score
          try {
            chrome.runtime.sendMessage({
              type: 'GENERATE_SCORE',
              profile
            }, (response) => {
              console.log('Love Dial: Score generation response:', response);
              
              if (chrome.runtime.lastError) {
                console.error('Love Dial: Chrome runtime error:', chrome.runtime.lastError);
                if (resultsContainer) {
                  resultsContainer.innerHTML = `<p style="color: #c33;">Error: ${chrome.runtime.lastError.message}</p>`;
                }
                btn.innerHTML = '💖 Get Romantic Score';
                btn.disabled = false;
                return;
              }
              
              if (response && response.score) {
                if (resultsContainer) {
                  resultsContainer.innerHTML = `
                    <div style="background: #fff0f5; border-radius: 12px; padding: 20px; margin-top: 12px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h4 style="margin: 0; font-size: 18px;">Romantic Compatibility</h4>
                        <div style="font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${response.score}/100</div>
                      </div>
                      <div>
                        ${response.insights.map((insight: string) => `<div style="padding: 12px; background: white; border-radius: 8px; margin-bottom: 8px; font-size: 14px; color: #555;">${insight}</div>`).join('')}
                      </div>
                    </div>
                  `;
                }
              } else {
                if (resultsContainer) {
                  resultsContainer.innerHTML = `<p style="color: #c33;">Failed to generate score. ${response?.error || 'Please check API key.'}</p>`;
                }
              }
              btn.innerHTML = '💖 Get Romantic Score';
              btn.disabled = false;
            });
          } catch (error) {
            console.error('Love Dial: Error sending score message:', error);
            if (resultsContainer) {
              resultsContainer.innerHTML = `<p style="color: #c33;">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>`;
            }
            btn.innerHTML = '💖 Get Romantic Score';
            btn.disabled = false;
          }
        });
      }
    }, 100); // Small delay to ensure modal is in DOM
  }

  // Insert button into page
  document.body.appendChild(button);
}

// Initialize when page loads
function init() {
  // Check if we're on a LinkedIn profile page
  if (window.location.href.includes('/in/') && !window.location.href.includes('/feed')) {
    // Wait for page to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(injectCallButton, 2000); // Wait for LinkedIn to load
      });
    } else {
      setTimeout(injectCallButton, 2000);
    }
  }
}

// Run initialization
init();

// Watch for navigation (LinkedIn uses SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl && url.includes('/in/') && !url.includes('/feed')) {
    lastUrl = url;
    setTimeout(injectCallButton, 2000);
  }
}).observe(document, { subtree: true, childList: true });

