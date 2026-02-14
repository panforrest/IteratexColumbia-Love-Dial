// Background service worker for Love Dial

console.log('Love Dial: Background service worker loaded');

// Initialize storage on install
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('Love Dial: Extension installed');
    
    await chrome.storage.local.set({ 
      profiles: {},
      voicePreviews: {},
      romanticScores: {}
    });
  }
});

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Love Dial: Message received:', message);
  
  if (message.type === 'PROFILE_DETECTED') {
    // Store profile data
    if (sender.tab?.id) {
      chrome.storage.local.set({
        [`profile_${sender.tab.id}`]: message.profile,
        currentProfile: message.profile, // Also store as currentProfile for popup
      });
      console.log('Love Dial: Stored profile for tab', sender.tab.id);
    }
    sendResponse({ success: true });
  }
  
  if (message.type === 'OPEN_POPUP') {
    // Try to open popup (requires user gesture, so this might not work)
    // Alternative: Show notification or update badge
    chrome.action.setBadgeText({ text: '1' });
    chrome.action.setBadgeBackgroundColor({ color: '#FF6B9D' });
    
    // Try to open popup (this may not work from content script)
    chrome.action.openPopup().catch(() => {
      console.log('Love Dial: Cannot open popup programmatically. User should click extension icon.');
    });
    
    sendResponse({ success: true });
  }
  
  if (message.type === 'GET_PROFILE') {
    // Get profile for current tab
    if (sender.tab?.id) {
      chrome.storage.local.get(`profile_${sender.tab.id}`, (result) => {
        sendResponse({ profile: result[`profile_${sender.tab.id}`] || null });
      });
      return true; // Keep channel open for async
    }
    sendResponse({ profile: null });
  }
  
  if (message.type === 'GENERATE_VOICE') {
    // Generate voice preview using ElevenLabs
    const profile = message.profile;
    generateVoice(profile).then((audioUrl) => {
      sendResponse({ audioUrl });
    }).catch((error) => {
      console.error('Love Dial: Voice generation error:', error);
      sendResponse({ error: error.message });
    });
    return true; // Keep channel open for async
  }
  
  if (message.type === 'GENERATE_SCORE') {
    // Generate romantic score using Anthropic
    const profile = message.profile;
    generateScore(profile).then((result) => {
      sendResponse(result);
    }).catch((error) => {
      console.error('Love Dial: Score generation error:', error);
      sendResponse({ error: error.message });
    });
    return true; // Keep channel open for async
  }
  
  return true; // Keep message channel open for async response
});

// Generate voice preview
async function generateVoice(profile: any): Promise<string> {
  // Generate personalized message from Forrest Pan's perspective about the profile
  let voiceText = `Hi, I'm Forrest Pan, AI Research Engineer & Serial Hackathon Winner. `;
  
  // Add personalized message about the profile
  if (profile.name && profile.name !== 'Unknown' && profile.name !== 'No headline available') {
    voiceText += `I noticed you're ${profile.name}. `;
  }
  
  // Add their headline if available
  if (profile.headline && profile.headline !== 'No headline available' && profile.headline.length > 5) {
    voiceText += `You're a ${profile.headline}. `;
  }
  
  // Add something from their about section if available
  if (profile.about && profile.about !== 'No about section available' && profile.about.length > 20) {
    const aboutSnippet = profile.about.substring(0, 150);
    voiceText += `I see you're interested in ${aboutSnippet}. `;
  }
  
  // Add experience if available
  if (profile.experience && profile.experience.length > 0 && profile.experience[0] !== 'No experience listed') {
    const firstExp = profile.experience[0].substring(0, 100);
    voiceText += `Your experience in ${firstExp} caught my attention. `;
  }
  
  // Closing
  voiceText += `I'd love to connect and learn more about what you're working on. Let's chat!`;
  
  // Limit total length
  const voiceTextFinal = voiceText.substring(0, 500);
  
  // NOTE: Replace with your API key
  // Get your API key from: https://elevenlabs.io/app/settings/api-keys
  const ELEVENLABS_API_KEY = 'YOUR_ELEVENLABS_API_KEY_HERE';
  const ELEVENLABS_VOICE_ID = 'ErXwobaYiN019PkySvjV'; // Antoni voice
  
  console.log('Love Dial: Generating voice with text:', voiceTextFinal);
  console.log('Love Dial: Text length:', voiceTextFinal.length);
  console.log('Love Dial: Using voice ID:', ELEVENLABS_VOICE_ID);
  console.log('Love Dial: Profile data:', profile);
  
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: voiceTextFinal,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });
    
    console.log('Love Dial: ElevenLabs response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Love Dial: ElevenLabs API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      // Try to parse error JSON
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.detail) {
          errorMessage = errorJson.detail.message || errorJson.detail || errorMessage;
        }
      } catch (e) {
        // Not JSON, use text as is
        if (errorText) {
          errorMessage = errorText.substring(0, 200);
        }
      }
      
      throw new Error(errorMessage);
    }
    
    const audioBlob = await response.blob();
    console.log('Love Dial: Audio blob received, size:', audioBlob.size);
    
    // Convert blob to data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Love Dial: Audio converted to data URL');
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error('Love Dial: FileReader error:', error);
        reject(new Error('Failed to convert audio blob'));
      };
      reader.readAsDataURL(audioBlob);
    });
  } catch (error) {
    console.error('Love Dial: Voice generation exception:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Voice generation failed: ${String(error)}`);
  }
}

// Generate romantic score
async function generateScore(profile: any): Promise<{ score: number; insights: string[] }> {
  // Build prompt more intelligently based on available data
  let prompt = `Analyze this LinkedIn profile for romantic compatibility and give a score from 0-100, plus 2-3 insights.

Name: ${profile.name}`;

  // Only include fields that have meaningful data
  if (profile.headline && profile.headline !== 'No headline available' && profile.headline.length > 5) {
    prompt += `\nHeadline: ${profile.headline}`;
  }
  
  if (profile.about && profile.about !== 'No about section available' && profile.about.length > 10) {
    prompt += `\nAbout: ${profile.about}`;
  }
  
  if (profile.experience && profile.experience.length > 0 && profile.experience[0] !== 'No experience listed') {
    prompt += `\nExperience: ${profile.experience.join(', ')}`;
  }

  prompt += `\n\nEven with limited information, provide a thoughtful analysis based on what's available. Be creative and positive.

Respond in this format:
Score: [number]/100
Insights:
- [insight 1]
- [insight 2]
- [insight 3]`;

  console.log('Love Dial: Generating score with prompt:', prompt);
  
  // NOTE: Replace with your API key
  // Get your API key from: https://console.anthropic.com/settings/keys
  const ANTHROPIC_API_KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    console.log('Love Dial: Anthropic response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Love Dial: Anthropic API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage = errorJson.error.message || errorJson.error || errorMessage;
        }
      } catch (e) {
        if (errorText) {
          errorMessage = errorText.substring(0, 200);
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Love Dial: Anthropic response data:', data);
    const content = data.content[0].text;
    console.log('Love Dial: Anthropic content:', content);

    // Parse response - try multiple patterns
    let score = 75; // Default
    const scorePatterns = [
      /Score:\s*(\d+)/i,
      /(\d+)\s*\/\s*100/i,
      /score\s*of\s*(\d+)/i,
      /(\d+)\s*out\s*of\s*100/i
    ];
    
    for (const pattern of scorePatterns) {
      const match = content.match(pattern);
      if (match) {
        score = parseInt(match[1]);
        if (score >= 0 && score <= 100) {
          console.log('Love Dial: Found score:', score);
          break;
        }
      }
    }

    // Extract insights - try multiple patterns
    const insights: string[] = [];
    const insightPatterns = [
      /Insights?:([\s\S]*?)(?:\n\n|$)/i,
      /Insights?:([\s\S]*?)(?:Score|$)/i
    ];
    
    for (const pattern of insightPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        const insightText = matches[1] || matches[0];
        const lines = insightText.split('\n').filter(line => line.trim().startsWith('-') || (line.trim().length > 10 && !line.includes('Score')));
        insights.push(...lines.map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean).slice(0, 3));
        if (insights.length >= 2) break;
      }
    }
    
    // Also try to find bullet points
    const bulletMatches = content.matchAll(/- ([^\n]+)/g);
    for (const match of bulletMatches) {
      if (match[1] && !match[1].includes('Score') && match[1].length > 10) {
        insights.push(match[1].trim());
        if (insights.length >= 3) break;
      }
    }
    
    // If no insights found, create some default ones
    if (insights.length === 0) {
      insights.push(
        `${profile.name} has a professional LinkedIn presence`,
        'Limited profile information available for analysis',
        'Would benefit from more profile details for accurate assessment'
      );
    }

    console.log('Love Dial: Parsed score:', score, 'insights:', insights);
    return { score, insights: insights.slice(0, 3) };
  } catch (error) {
    console.error('Love Dial: Score generation exception:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Score generation failed: ${String(error)}`);
  }
}

