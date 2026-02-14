# Iterate x Columbia Love Dial - Project Plan
**Hackathon**: Iterate x Columbia AI Club Hackathon  
**Deadline**: 4:00 PM, Saturday, February 14, 2026  
**Project Type**: Chrome Extension + Full-Stack Landing Pages

---

## 🎯 Project Overview

**Love Dial** is a Chrome Extension that transforms LinkedIn networking into a romantic matchmaking experience. It adds a "Call" button to LinkedIn profiles that uses AI to generate voice previews, rank romantic compatibility, and create beautiful "Our Story" landing pages for successful matches.

**Core Value Proposition**: 
- **Entertainment Factor**: Voice previews create an immediate "wow" moment
- **Practical Utility**: Solves the "how do I break the ice on LinkedIn?" problem
- **Sponsor Integration**: Deep integration with ElevenLabs, Anthropic, and Lovable

---

## 🏗️ Technology Stack

### **Core Technologies**
- **Frontend**: React + TypeScript (Chrome Extension)
- **Build Tool**: Vite + vite-plugin-web-extension
- **Styling**: Tailwind CSS (for landing pages) + CSS Modules (for extension)
- **Backend**: Node.js/Express (for API proxy and landing page generation)
- **Deployment**: Vercel/Netlify (for landing pages), Chrome Web Store ready

### **Sponsor Integrations**
1. **ElevenLabs API** - Voice generation and voice cloning
2. **Anthropic Claude API** - Profile analysis and romantic intent scoring
3. **Lovable** (Optional) - Quick landing page generation (or build with Cursor)
4. **Blaxel** (Optional) - Persistent sandboxes for AI agents
5. **Perle** (Optional) - Data labeling for training
6. **White Circle AI** (Optional) - AI safety testing

### **APIs & Services**
- **LinkedIn** (via content script injection)
- **ElevenLabs API** - Text-to-speech, voice cloning
- **Anthropic Claude API** - Profile analysis, romantic scoring
- **Express.js** - Backend API for profile processing
- **Vercel/Netlify** - Landing page hosting

---

## 🎨 Visual Design & Web Pages

### **1. Chrome Extension Popup**
- **Design**: Modern, clean, romantic theme (pink/red accents)
- **Features**:
  - Profile preview card
  - "Generate Voice Preview" button
  - Romantic Intent Score display (F-Score)
  - Settings for voice preferences
  - History of viewed profiles

### **2. LinkedIn Profile Integration**
- **"Call" Button**: Floating button on LinkedIn profile pages
- **Voice Preview Modal**: 
  - Audio player with generated voice
  - "Leave Voice Bio" option
  - Romantic compatibility score
  - "Generate Our Story" button (if match is successful)

### **3. "Our Story" Landing Page**
- **Design**: Beautiful, romantic, shareable landing page
- **Sections**:
  - Hero section with couple names
  - "How We Met" AI-generated story
  - Professional bios (how they met professionally)
  - Timeline of connection
  - Share buttons (social media)
  - Custom domain: `lovestory.lovedial.app/[couple-id]`

### **4. Dashboard (Optional - Stretch)**
- Profile browsing interface
- Match history
- Voice bio library

---

## 🔑 Key Features (Build Priority Order)

### **Phase 1: MVP Core (Must Have - 2-3 hours)**
1. ✅ **Chrome Extension Foundation**
   - Manifest.json setup
   - Content script injection on LinkedIn
   - Basic popup UI
   - Extension icons

2. ✅ **LinkedIn Profile Detection**
   - Detect LinkedIn profile pages
   - Extract profile data (name, headline, about, experience)
   - Inject "Call" button into profile page

3. ✅ **ElevenLabs Voice Preview**
   - Generate voice preview from profile text
   - Audio player in popup/modal
   - Basic error handling

### **Phase 2: AI Intelligence (Must Have - 2-3 hours)**
4. ✅ **Anthropic Profile Analysis**
   - Extract profile data and send to Claude
   - Generate romantic intent score (F-Score 0-100)
   - Display compatibility insights

5. ✅ **Voice Bio Feature**
   - Allow users to record/upload voice bio
   - Store voice bio (local storage or backend)
   - Display voice bio on profile

### **Phase 3: Match & Story Generation (Must Have - 2-3 hours)**
6. ✅ **Match Detection**
   - Detect when two users have viewed each other
   - Trigger "match" event
   - Generate match notification

7. ✅ **"Our Story" Landing Page Generator**
   - Backend API to generate landing page
   - AI-generated "How We Met" story using Anthropic
   - Professional bios integration
   - Beautiful, shareable design
   - Deploy to Vercel/Netlify

### **Phase 4: Polish & Wow Factor (Should Have - 1-2 hours)**
8. ✅ **Enhanced UI/UX**
   - Beautiful animations
   - Loading states
   - Error handling
   - Success notifications

9. ✅ **Voice Translation (Stretch)**
   - Real-time voice translation if profiles speak different languages
   - Multi-language support

10. ✅ **Analytics & Stats**
    - Track voice previews generated
    - Track matches made
    - Track stories created

### **Phase 5: Demo Preparation (Must Have - 1 hour)**
11. ✅ **Demo Script & Flow**
    - Pre-loaded demo profiles
    - Smooth demo flow
    - Backup plan if APIs fail

---

## 📋 Step-by-Step Build Plan

### **STEP 1: Project Setup & Foundation** ⏱️ 30 min
**Goal**: Set up project structure, dependencies, and basic Chrome extension

**Tasks**:
- [ ] Create project directory: `Iterate x Columbia Love Dial`
- [ ] Initialize npm project with TypeScript
- [ ] Set up Vite + vite-plugin-web-extension
- [ ] Create manifest.json (Chrome Extension v3)
- [ ] Set up basic folder structure:
  ```
  src/
    background/
    content/
    popup/
    utils/
  public/
    icons/
  ```
- [ ] Create extension icons (16, 48, 128px)
- [ ] Test extension loads in Chrome

**Deliverable**: Extension loads in Chrome with basic popup

---

### **STEP 2: LinkedIn Profile Detection** ⏱️ 45 min
**Goal**: Detect LinkedIn profiles and extract profile data

**Tasks**:
- [ ] Create content script for LinkedIn (`src/content/linkedin-detector.ts`)
- [ ] Detect LinkedIn profile page URLs
- [ ] Extract profile data:
  - Name
  - Headline
  - About section
  - Experience
  - Profile image URL
- [ ] Store profile data in extension storage
- [ ] Test on real LinkedIn profiles

**Deliverable**: Extension can detect and extract LinkedIn profile data

---

### **STEP 3: Inject "Call" Button on LinkedIn** ⏱️ 45 min
**Goal**: Add floating "Call" button to LinkedIn profile pages

**Tasks**:
- [ ] Create button injection script
- [ ] Style button (romantic theme, eye-catching)
- [ ] Position button on profile page (top right or near profile header)
- [ ] Add click handler to open popup/modal
- [ ] Handle page navigation (LinkedIn is SPA)
- [ ] Test button appears and works

**Deliverable**: "Call" button appears on LinkedIn profiles and opens popup

---

### **STEP 4: Extension Popup UI** ⏱️ 1 hour
**Goal**: Create beautiful popup interface for voice preview

**Tasks**:
- [ ] Create React popup component (`src/popup/PopupApp.tsx`)
- [ ] Design popup UI:
  - Profile card (name, headline, image)
  - "Generate Voice Preview" button
  - Audio player component
  - Loading states
  - Error messages
- [ ] Style with CSS (romantic theme)
- [ ] Connect to background script for API calls
- [ ] Test popup opens and displays profile data

**Deliverable**: Beautiful popup UI that displays profile and has voice preview button

---

### **STEP 5: ElevenLabs Integration** ⏱️ 1.5 hours
**Goal**: Generate voice previews from profile text using ElevenLabs

**Tasks**:
- [ ] Set up ElevenLabs API client
- [ ] Create backend proxy API (to hide API keys) OR use extension storage for API key
- [ ] Generate text prompt from profile data:
  - "Hi, I'm [name]. [headline]. [about section summary]"
- [ ] Call ElevenLabs text-to-speech API
- [ ] Stream/download audio
- [ ] Display audio player in popup
- [ ] Handle errors gracefully
- [ ] Add voice selection (different voices for different profiles)

**Deliverable**: Clicking "Generate Voice Preview" creates and plays AI-generated voice

---

### **STEP 6: Anthropic Profile Analysis** ⏱️ 1.5 hours
**Goal**: Analyze profiles and generate romantic intent score

**Tasks**:
- [ ] Set up Anthropic Claude API client
- [ ] Create prompt for romantic intent analysis:
  - Analyze profile for romantic compatibility
  - Generate F-Score (0-100)
  - Provide insights (shared interests, complementary skills, etc.)
- [ ] Call Claude API with profile data
- [ ] Parse response and extract score + insights
- [ ] Display score in popup UI
- [ ] Add visual indicator (heart icon, score bar)
- [ ] Cache results to avoid repeated API calls

**Deliverable**: Popup shows romantic intent score and compatibility insights

---

### **STEP 7: Voice Bio Feature** ⏱️ 1 hour
**Goal**: Allow users to leave voice bios on profiles

**Tasks**:
- [ ] Add "Leave Voice Bio" button in popup
- [ ] Create voice recording interface (or upload)
- [ ] Use ElevenLabs voice cloning (if available) OR simple upload
- [ ] Store voice bio (local storage or backend)
- [ ] Display voice bio on profile when available
- [ ] Add playback controls

**Deliverable**: Users can leave and play voice bios on profiles

---

### **STEP 8: Match Detection System** ⏱️ 1 hour
**Goal**: Detect when two users have viewed each other's profiles

**Tasks**:
- [ ] Track profile views in storage
- [ ] Create match detection logic:
  - User A views User B's profile
  - User B views User A's profile
  - Trigger match event
- [ ] Store match data
- [ ] Show match notification
- [ ] Add "Generate Our Story" button on match

**Deliverable**: System detects mutual profile views and creates matches

---

### **STEP 9: Backend API Setup** ⏱️ 1 hour
**Goal**: Create backend for landing page generation

**Tasks**:
- [ ] Set up Express.js server
- [ ] Create API endpoints:
  - `/api/generate-story` - Generate "Our Story" page
  - `/api/profile-analysis` - Analyze profile (if needed)
- [ ] Set up environment variables for API keys
- [ ] Deploy to Vercel/Netlify
- [ ] Test API endpoints

**Deliverable**: Backend API deployed and accessible

---

### **STEP 10: "Our Story" Landing Page Generator** ⏱️ 2 hours
**Goal**: Generate beautiful landing pages for matched couples

**Tasks**:
- [ ] Create landing page template (React/HTML)
- [ ] Design beautiful, romantic UI:
  - Hero section with couple names
  - "How We Met" story section
  - Professional bios section
  - Timeline section
  - Share buttons
- [ ] Use Anthropic to generate "How We Met" story:
  - Combine both profiles
  - Generate romantic, professional story
- [ ] Generate unique URL for each couple
- [ ] Deploy landing pages (Vercel/Netlify)
- [ ] Add share functionality (copy link, social media)

**Deliverable**: Clicking "Generate Our Story" creates and deploys beautiful landing page

---

### **STEP 11: UI/UX Polish** ⏱️ 1 hour
**Goal**: Make everything beautiful and smooth

**Tasks**:
- [ ] Add loading animations
- [ ] Add success/error notifications
- [ ] Improve button styles and hover effects
- [ ] Add transitions and animations
- [ ] Ensure responsive design
- [ ] Test on different screen sizes
- [ ] Fix any UI bugs

**Deliverable**: Polished, professional-looking UI

---

### **STEP 12: Error Handling & Edge Cases** ⏱️ 45 min
**Goal**: Handle errors gracefully

**Tasks**:
- [ ] Add error handling for API failures
- [ ] Handle network errors
- [ ] Handle invalid profile data
- [ ] Add retry logic for failed API calls
- [ ] Add fallback UI for errors
- [ ] Test error scenarios

**Deliverable**: Extension handles errors gracefully

---

### **STEP 13: Demo Preparation** ⏱️ 1 hour
**Goal**: Prepare for demo

**Tasks**:
- [ ] Create demo script
- [ ] Pre-load demo profiles (or use real ones)
- [ ] Test full demo flow
- [ ] Create backup plan (screenshots/video if APIs fail)
- [ ] Prepare pitch deck (if needed)
- [ ] Test on demo laptop/device
- [ ] Ensure all APIs are working
- [ ] Create demo data (matches, stories)

**Deliverable**: Ready to demo with smooth flow

---

### **STEP 14: Final Testing** ⏱️ 30 min
**Goal**: Final testing and bug fixes

**Tasks**:
- [ ] Test all features end-to-end
- [ ] Fix any bugs found
- [ ] Test on different LinkedIn profiles
- [ ] Verify all sponsor integrations work
- [ ] Check performance
- [ ] Final UI polish

**Deliverable**: Fully functional, tested extension

---

## 🎯 Success Criteria

### **Must Have (MVP)**
- ✅ Chrome Extension loads and works
- ✅ "Call" button appears on LinkedIn profiles
- ✅ Voice preview generates using ElevenLabs
- ✅ Romantic intent score displays using Anthropic
- ✅ "Our Story" landing page generates for matches
- ✅ Demo works smoothly

### **Should Have (Nice to Have)**
- ✅ Voice bio feature
- ✅ Beautiful UI/UX
- ✅ Match detection
- ✅ Shareable landing pages

### **Stretch Goals**
- ✅ Voice translation
- ✅ Dashboard for browsing profiles
- ✅ Analytics
- ✅ Additional sponsor integrations

---

## 🔄 Build Process Workflow

**For each step:**
1. **Build** the feature
2. **Test** locally
3. **Review** with you
4. **Fix** any issues
5. **Proceed** to next step

**We'll pause after each step to review and test together before moving forward.**

---

## 📦 Reusable Code from Previous Projects

### **From TIQC-TOQC:**
- ✅ Chrome Extension structure (manifest, vite config)
- ✅ Content script injection pattern
- ✅ Popup React component structure
- ✅ Background service worker setup
- ✅ Storage utilities

### **From SuperPulse-Halftime:**
- ✅ React + TypeScript setup
- ✅ Vite build configuration
- ✅ Extension popup patterns

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Build for production
npm run build

# Load extension in Chrome
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the `dist` folder
```

---

## 📝 Notes

- **API Keys**: Store in environment variables or extension storage
- **CORS**: May need backend proxy for some APIs
- **LinkedIn**: Content script injection works, but be respectful of their ToS
- **Demo**: Have backup plan if APIs are slow/fail
- **Sponsor Integration**: Prioritize ElevenLabs and Anthropic (core features)

---

## 🎤 Demo Flow (3 minutes)

1. **Hook (30 sec)**: "LinkedIn is professional, but what if we made it romantic?"
2. **Show Extension (30 sec)**: Open LinkedIn profile, show "Call" button
3. **Voice Preview (60 sec)**: Click button, generate voice, play audio
4. **Romantic Score (30 sec)**: Show compatibility score and insights
5. **Our Story (30 sec)**: Show match, generate landing page
6. **Closing (10 sec)**: "Love Dial - Making LinkedIn connections more personal"

---

**Let's build this step by step! Ready to start with STEP 1?** 🚀

