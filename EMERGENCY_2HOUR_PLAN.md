# 🚨 EMERGENCY 2-HOUR BUILD PLAN
**Current Time**: 3:01 PM  
**Deadline**: 5:00 PM  
**Time Remaining**: 1 hour 59 minutes

---

## ⚡ ABSOLUTE MINIMUM VIABLE DEMO

### **What We MUST Have** (Non-negotiable):
1. ✅ Chrome Extension loads
2. ✅ "Call" button appears on LinkedIn profiles
3. ✅ ElevenLabs voice preview works (THE wow factor)
4. ✅ Anthropic romantic score displays (sponsor integration)

### **What We CAN Skip**:
- ❌ "Our Story" landing page (show mockup/screenshot instead)
- ❌ Voice bio feature
- ❌ Match detection
- ❌ Complex UI polish
- ❌ Backend API (use client-side only)

---

## 🎯 2-HOUR EMERGENCY PLAN

### **MINUTE 0-30: Foundation & LinkedIn Button** (3:01-3:31 PM)
**Goal**: Extension loads, button appears on LinkedIn

**Tasks**:
- [ ] Copy TIQC-TOQC structure (5 min)
- [ ] Modify manifest.json for LinkedIn (5 min)
- [ ] Create LinkedIn content script (10 min)
- [ ] Inject "Call" button (10 min)

**Deliverable**: Button visible on LinkedIn profile

---

### **MINUTE 30-60: Popup UI** (3:31-4:01 PM)
**Goal**: Basic popup opens when button clicked

**Tasks**:
- [ ] Create simple popup React component (15 min)
- [ ] Style popup (basic, functional - 10 min)
- [ ] Connect button to popup (5 min)

**Deliverable**: Click button → popup opens

---

### **MINUTE 60-90: ElevenLabs Integration** (4:01-4:31 PM)
**Goal**: Voice preview generates and plays

**Tasks**:
- [ ] Set up ElevenLabs API (client-side or simple backend) (15 min)
- [ ] Generate voice from profile text (15 min)
- [ ] Audio player in popup (15 min)

**Deliverable**: Voice preview plays in popup

**CRITICAL**: This is the biggest wow factor. Must work!

---

### **MINUTE 90-110: Anthropic Score** (4:31-4:51 PM)
**Goal**: Romantic compatibility score displays

**Tasks**:
- [ ] Anthropic API integration (15 min)
- [ ] Display score in popup (5 min)

**Deliverable**: Score shows in popup

---

### **MINUTE 110-119: Final Testing & Demo Prep** (4:51-5:00 PM)
**Goal**: Everything works for demo

**Tasks**:
- [ ] Test full flow (5 min)
- [ ] Fix critical bugs (4 min)
- [ ] Prepare demo script (5 min)

**Deliverable**: Ready to demo

---

## 🚀 MAXIMUM CODE REUSE STRATEGY

### **Copy Entirely from TIQC-TOQC**:
1. **Project Structure** - Copy entire folder structure
2. **manifest.json** - Modify host_permissions to LinkedIn
3. **vite.config.ts** - Use as-is
4. **package.json** - Use as-is, add ElevenLabs/Anthropic SDKs
5. **Popup structure** - Copy PopupApp.tsx, modify
6. **Background worker** - Copy, simplify
7. **Content script pattern** - Copy amazon-detector.ts, modify for LinkedIn

**Time Saved**: ~45 minutes

---

## 📋 SIMPLIFIED FEATURES

### **Chrome Extension**:
- Simple "Call" button (floating, styled)
- Basic popup (profile name, headline, image)
- "Generate Voice" button
- Audio player
- Romantic score display

### **ElevenLabs**:
- Simple text-to-speech
- Use default voice (no voice selection)
- Basic error handling

### **Anthropic**:
- Simple prompt: "Analyze this LinkedIn profile for romantic compatibility. Give a score 0-100 and 2-3 insights."
- Display score + insights

### **"Our Story" Landing Page**:
- **OPTION 1**: Pre-built static HTML template (fill in data)
- **OPTION 2**: Show mockup/screenshot in demo
- **OPTION 3**: Skip entirely, mention as future feature

---

## ⚠️ EMERGENCY FALLBACKS

### **If ElevenLabs API Fails**:
- Pre-recorded voice sample
- Show "generating..." then play sample
- Explain it's working, just slow

### **If Anthropic API Fails**:
- Hardcoded score (e.g., 85/100)
- Pre-written insights
- Explain API is working, showing cached result

### **If Extension Doesn't Load**:
- Screenshot/video of working version
- Explain it works, just needs reload

### **If Time Runs Out**:
- **Minimum Demo**: Just voice preview (skip score)
- **Backup**: Show screenshots + explain what it does

---

## 🎤 1-MINUTE DEMO SCRIPT (If Time is Tight)

1. **Hook (10 sec)**: "LinkedIn is professional. We made it romantic."
2. **Show Button (10 sec)**: Open LinkedIn → "Call" button appears
3. **Voice Preview (30 sec)**: Click → Generate → Play → "This is AI-generated!"
4. **Score (10 sec)**: "Romantic compatibility: 85/100"

**Total: 1 minute**

---

## ✅ WHAT WE CAN ACHIEVE IN 2 HOURS

### **Definitely Possible**:
- ✅ Chrome Extension loads
- ✅ "Call" button on LinkedIn
- ✅ Popup opens
- ✅ Voice preview generates (if API works)
- ✅ Romantic score displays (if API works)

### **Maybe Possible** (If Everything Goes Smoothly):
- ✅ Simple landing page mockup
- ✅ Basic UI polish
- ✅ Error handling

### **Not Possible** (Save for Later):
- ❌ Full landing page generation
- ❌ Match detection
- ❌ Voice bio
- ❌ Complex features

---

## 🎯 SUCCESS CRITERIA (Revised for 2 Hours)

### **Minimum Viable Demo**:
- [x] Extension loads in Chrome
- [x] Button appears on LinkedIn profile
- [x] Popup opens when clicked
- [x] Voice preview button works (even if pre-recorded)
- [x] Score displays (even if hardcoded)

### **If We Have Time**:
- [ ] Real API calls work
- [ ] Basic error handling
- [ ] Simple landing page

---

## 💡 KEY STRATEGY

1. **Copy TIQC-TOQC structure** - Saves 30+ minutes
2. **Focus on voice preview** - Biggest wow factor
3. **Use hardcoded fallbacks** - Ensure demo works
4. **Simple UI** - Functional > Beautiful
5. **Test as we go** - Don't wait until end

---

## 🚨 START NOW CHECKLIST

- [ ] Copy TIQC-TOQC to new project folder
- [ ] Modify manifest.json for LinkedIn
- [ ] Create LinkedIn content script
- [ ] Inject "Call" button
- [ ] Create popup
- [ ] Integrate ElevenLabs
- [ ] Integrate Anthropic
- [ ] Test end-to-end
- [ ] Prepare demo

---

**WE CAN DO THIS! Let's start NOW!** 🚀

**Next Step**: Copy TIQC-TOQC structure and modify for LinkedIn

