# 💕 Love Dial - Chrome Extension

**Making LinkedIn connections more personal with AI voice previews and romantic compatibility scores.**

A Chrome extension that adds a "Call" button to LinkedIn profiles, generating personalized voice messages from your perspective and romantic compatibility scores using AI.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd "Iterate x Columbia Love Dial"
npm install
```

### 2. Add API Keys

Edit `src/background/background.ts` and replace:
- `ELEVENLABS_API_KEY` (line ~120) - Get from https://elevenlabs.io
- `ANTHROPIC_API_KEY` (line ~200) - Get from https://console.anthropic.com

**Note:** The extension uses the Antoni voice (ElevenLabs Voice ID: `ErXwobaYiN019PkySvjV`)

### 3. Build Extension
```bash
npm run build  # Production build
```

### 4. Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `dist` folder from this project

### 5. Test on LinkedIn
1. Go to any LinkedIn profile (e.g., `linkedin.com/in/...`)
2. Look for the pink "💕 Call" button (top right of profile)
3. Click it to open the modal
4. Click "Generate Voice Preview" to hear a personalized message
5. Click "Get Romantic Score" to see compatibility analysis

## 📋 Features

- ✅ **LinkedIn Profile Detection** - Automatically detects LinkedIn profiles and extracts data
- ✅ **"Call" Button** - Floating pink button on profile pages
- ✅ **Personalized Voice Preview** - AI-generated voice messages from your perspective about each profile (ElevenLabs)
- ✅ **Romantic Compatibility Score** - AI-powered compatibility analysis with insights (Anthropic Claude)
- ✅ **Profile Data Extraction** - Robust extraction of name, headline, about section, and experience

## 🔧 Technical Details

### Tech Stack
- **TypeScript** - Type-safe development
- **React** - UI components
- **Vite** - Build tool
- **Chrome Extension Manifest V3** - Modern extension architecture
- **ElevenLabs API** - Text-to-speech voice generation
- **Anthropic Claude API** - Natural language processing for compatibility scoring

### Architecture
- **Content Script** (`src/content/linkedin-detector.ts`) - Detects profiles, extracts data, injects UI
- **Background Service Worker** (`src/background/background.ts`) - Handles API calls and state management
- **Modal UI** - Injected directly into LinkedIn pages for seamless UX

### Voice Generation
The extension generates personalized messages in the format:
> "Hi, I'm Forrest Pan, AI Research Engineer & Serial Hackathon Winner. I noticed you're [Name]. You're a [Headline]. I see you're interested in [About]. Your experience in [Experience] caught my attention. I'd love to connect and learn more about what you're working on. Let's chat!"

## 🎯 Demo Flow

1. Navigate to any LinkedIn profile
2. Click the pink "💕 Call" button
3. Modal opens with profile information
4. Click "Generate Voice Preview" → Hear personalized AI voice message
5. Click "Get Romantic Score" → See compatibility score (0-100) with insights

## ⚠️ Troubleshooting

- **Button doesn't appear**: Wait 2-3 seconds for LinkedIn to load, or refresh the page
- **API errors**: Check API keys are correct in `src/background/background.ts`
- **Extension doesn't load**: Make sure you're loading the `dist` folder, not `src`
- **Profile data not extracted**: LinkedIn's DOM structure may have changed; check browser console for extraction logs

## 📁 Project Structure

```
Iterate x Columbia Love Dial/
├── src/
│   ├── background/          # Service worker for API calls
│   ├── content/             # Content scripts for LinkedIn
│   └── popup/               # Extension popup UI
├── dist/                    # Built extension (load this in Chrome)
├── public/                  # Static assets (icons)
└── manifest.json            # Extension manifest
```

## 🚨 Notes

- API keys are currently hardcoded in `src/background/background.ts` for demo purposes
- The voice always introduces as "Forrest Pan" for consistent branding
- Profile data extraction uses multiple fallback selectors to handle LinkedIn's dynamic DOM

---

**Built for Iterate x Columbia AI Club Hackathon - Feb 14, 2026**

**Created by:** Forrest Pan (AI Research Engineer & Serial Hackathon Winner)

