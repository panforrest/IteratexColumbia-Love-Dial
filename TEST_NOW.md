# 🧪 TEST NOW - Step by Step

## ✅ READY TO TEST! (5 minutes)

### **Step 1: Load Extension** (1 min)

1. Open Chrome
2. Go to: `chrome://extensions/`
3. **Enable "Developer mode"** (top right toggle)
4. Click **"Load unpacked"**
5. Navigate to: `/home/peter-pan/Iterate x Columbia Love Dial/dist`
6. Select the `dist` folder
7. ✅ Extension "Love Dial" should appear!

### **Step 2: Test on LinkedIn** (2 min)

1. Go to any LinkedIn profile:
   - Example: `https://www.linkedin.com/in/yourname`
   - Or any public profile
2. **Wait 2-3 seconds** for page to load
3. Look at the **top right corner** of the page
4. ✅ You should see a **pink "💕 Call" button**!

### **Step 3: Test Popup** (1 min)

1. Click the "💕 Call" button
2. ✅ A popup window should open showing:
   - "💕 Love Dial" header
   - Profile name and headline
   - Profile image (if available)
   - "🎤 Generate Voice Preview" button
   - "💖 Get Romantic Score" button

### **Step 4: Check Console** (1 min)

1. Press **F12** to open DevTools
2. Go to **Console** tab
3. You should see: `Love Dial: LinkedIn detector loaded`
4. ✅ Content script is working!

---

## ⚠️ Expected Behavior

### **✅ What Should Work:**
- Extension loads in Chrome
- Button appears on LinkedIn profiles
- Popup opens when button clicked
- Profile data displays in popup

### **⚠️ What Will Show Errors (Normal!):**
- Clicking "Generate Voice Preview" → Error: "Failed to generate voice preview. Please check API key."
- Clicking "Get Romantic Score" → Error: "Failed to generate romantic score. Please check API key."

**This is expected!** You need to add API keys first.

---

## 🔧 If Something Doesn't Work

### **Button doesn't appear:**
- Refresh the LinkedIn page
- Make sure you're on a profile page (`/in/username`)
- Check console for errors (F12)

### **Popup doesn't open:**
- Make sure extension is enabled (check `chrome://extensions/`)
- Reload the extension (click reload icon)
- Check console for errors

### **Extension won't load:**
- Make sure you selected the `dist` folder (not `src`)
- Check that `manifest.json` exists in `dist/`
- Check console for errors

---

## 🎯 Next Steps After Testing

Once basic test works:

1. **Add API Keys** (5 min)
   - Edit `src/popup/PopupApp.tsx`
   - Add ElevenLabs API key (line ~50)
   - Add Anthropic API key (line ~90)
   - Run `npm run build`
   - Reload extension

2. **Test Full Flow** (10 min)
   - Test voice generation
   - Test romantic score
   - Fix any bugs

3. **Demo Prep** (30 min)
   - Create demo script
   - Prepare backup plan
   - Final polish

---

## 🚀 GO TEST NOW!

**Start with Step 1 above and let me know what happens!**

If everything works, we'll add API keys next. If something breaks, tell me and I'll fix it! 🎉

