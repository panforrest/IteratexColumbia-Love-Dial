// Modal overlay for Love Dial popup

export function createModal(profile: any) {
  // Remove existing modal if present
  const existingModal = document.getElementById('love-dial-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'love-dial-modal';
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Create modal content
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    position: relative;
  `;

  // Modal header
  const header = document.createElement('div');
  header.style.cssText = `
    background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
    color: white;
    padding: 20px;
    border-radius: 16px 16px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  header.innerHTML = `
    <div>
      <h2 style="margin: 0 0 4px 0; font-size: 24px;">💕 Love Dial</h2>
      <p style="margin: 0; font-size: 14px; opacity: 0.9;">Making LinkedIn connections more personal</p>
    </div>
    <button id="love-dial-close" style="
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 24px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    ">×</button>
  `;

  // Modal body
  const body = document.createElement('div');
  body.style.cssText = `
    padding: 20px;
  `;

  // Profile card
  const profileCard = document.createElement('div');
  profileCard.style.cssText = `
    background: #f8f8f8;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  `;

  const profileHeader = document.createElement('div');
  profileHeader.style.cssText = `
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  `;

  if (profile.imageUrl) {
    const img = document.createElement('img');
    img.src = profile.imageUrl;
    img.style.cssText = `
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #FF6B9D;
    `;
    profileHeader.appendChild(img);
  }

  const profileInfo = document.createElement('div');
  profileInfo.innerHTML = `
    <h3 style="margin: 0 0 4px 0; font-size: 20px; color: #333;">${profile.name}</h3>
    <p style="margin: 0; font-size: 14px; color: #666;">${profile.headline}</p>
  `;
  profileHeader.appendChild(profileInfo);
  profileCard.appendChild(profileHeader);

  if (profile.about) {
    const about = document.createElement('p');
    about.style.cssText = `
      font-size: 14px;
      color: #555;
      line-height: 1.6;
      margin: 0;
    `;
    about.textContent = profile.about.substring(0, 200) + '...';
    profileCard.appendChild(about);
  }

  body.appendChild(profileCard);

  // Buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;

  const voiceButton = document.createElement('button');
  voiceButton.id = 'love-dial-voice-btn';
  voiceButton.style.cssText = `
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  `;
  voiceButton.innerHTML = '🎤 Generate Voice Preview';
  buttonContainer.appendChild(voiceButton);

  const scoreButton = document.createElement('button');
  scoreButton.id = 'love-dial-score-btn';
  scoreButton.style.cssText = `
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  `;
  scoreButton.innerHTML = '💖 Get Romantic Score';
  buttonContainer.appendChild(scoreButton);

  body.appendChild(buttonContainer);

  // Results container
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'love-dial-results';
  resultsContainer.style.cssText = `
    margin-top: 20px;
  `;
  body.appendChild(resultsContainer);

  // Assemble modal
  modal.appendChild(header);
  modal.appendChild(body);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // Close button handler
  const closeBtn = document.getElementById('love-dial-close');
  closeBtn?.addEventListener('click', () => {
    backdrop.remove();
  });

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.remove();
    }
  });

  // Store profile for button handlers
  (backdrop as any).profile = profile;

  return backdrop;
}

