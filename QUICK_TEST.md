# 🧪 Quick Test Guide - Love Dial

## ✅ What You Can Test RIGHT NOW (Without API Keys)

### **Step 1: Load Extension in Chrome** (2 minutes)

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in top right)
4. Click **"Load unpacked"**
5. Navigate to: `/home/peter-pan/Iterate x Columbia Love Dial/dist`
6. Select the `dist` folder
7. ✅ Extension should appear in your extensions list

### **Step 2: Test on LinkedIn** (3 minutes)

1. Go to any LinkedIn profile (e.g., `linkedin.com/in/yourname`)
2. **Wait 2-3 seconds** for the page to fully load
3. Look for the **pink "💕 Call" button** in the top right corner
4. ✅ Button should appear!

### **Step 3: Test Popup** (2 minutes)

1. Click the "💕 Call" button
2. ✅ Popup should open showing:
   - Profile name
   - Headline
   - Profile image (if available)
   - "Generate Voice Preview" button
   - "Get Romantic Score" button

### **Step 4: Test Profile Detection** (1 minute)

1. Open browser console (F12)
2. Go to Console tab
3. You should see: `Love Dial: LinkedIn detector loaded`
4. ✅ Content script is working!

---

## ⚠️ What Won't Work Yet (Needs API Keys)

- ❌ Voice generation (needs ElevenLabs API key)
- ❌ Romantic score (needs Anthropic API key)

But the buttons will show error messages, which is fine for now!

---

## 🔧 Next Steps After Testing

### **If Button Doesn't Appear:**
- Refresh the LinkedIn page
- Check console for errors (F12 → Console)
- Make sure you're on a profile page (`/in/username`)

### **If Popup Doesn't Open:**
- Check if extension is enabled
- Reload the extension in `chrome://extensions/`
- Check console for errors

### **If Everything Works:**
1. ✅ Add API keys (see below)
2. ✅ Test voice generation
3. ✅ Test romantic score
4. ✅ Prepare for demo!

---

## 🔑 Adding API Keys (After Basic Test Works)

1. Edit: `src/popup/PopupApp.tsx`
2. Find line ~50: `const ELEVENLABS_API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace with your ElevenLabs key
4. Find line ~90: `const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';`
5. Replace with your Anthropic key
6. Rebuild: `npm run build`
7. Reload extension in Chrome

---

## 🎯 Expected Results

### **✅ Working:**
- Extension loads
- Button appears on LinkedIn
- Popup opens
- Profile data displays

### **⚠️ Will Show Errors (Until API Keys Added):**
- Voice generation button → "Failed to generate voice preview"
- Romantic score button → "Failed to generate romantic score"

**This is normal!** Once you add API keys, these will work.

---

## 🚀 Ready to Test?

1. Load extension in Chrome
2. Go to LinkedIn profile
3. Click "Call" button
4. See if popup opens!

**Let me know what happens!** 🎉

