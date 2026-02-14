# ✅ Verify Extension Files & Load Instructions

## 🔍 Step 1: Verify All Files Exist

Run this command to check:
```bash
cd "/home/peter-pan/Iterate x Columbia Love Dial/dist"
ls -la src/background/background.js
ls -la src/content/linkedin-detector.js  
ls -la src/popup/popup.html
ls -la icons/icon16.png
ls -la manifest.json
```

All should show files exist.

## 📦 Step 2: Load Extension in Chrome

1. **Open Chrome**
2. **Go to**: `chrome://extensions/`
3. **Enable "Developer mode"** (toggle in top right)
4. **Click "Load unpacked"**
5. **Navigate to**: `/home/peter-pan/Iterate x Columbia Love Dial/dist`
6. **Select the `dist` folder** (not a parent folder)
7. **Click "Select"**

## ⚠️ If You Get an Error

### **Error: "Could not load background script ''"**

**Possible causes:**
1. **Wrong folder selected** - Make sure you select the `dist` folder, not `src` or root
2. **Files missing** - Run the verification above
3. **Manifest issue** - Try rebuilding (see below)

**Try this:**
```bash
cd "/home/peter-pan/Iterate x Columbia Love Dial"
npm run build
```

Then try loading again.

### **Error: "Could not load manifest"**

**Check:**
1. Make sure `manifest.json` exists in `dist/`
2. JSON is valid (we verified this)
3. Try rebuilding

## 🎯 Correct Folder Structure

When you click "Load unpacked", you should select:
```
/home/peter-pan/Iterate x Columbia Love Dial/dist
```

Inside `dist/` you should see:
- `manifest.json`
- `icons/` folder
- `src/` folder
  - `background/`
  - `content/`
  - `popup/`

## ✅ Success Indicators

If extension loads successfully, you should see:
- "Love Dial" extension in the list
- No error messages
- Extension icon appears in Chrome toolbar

## 🧪 Test After Loading

1. Go to any LinkedIn profile
2. Look for pink "💕 Call" button (top right)
3. Click it - modal should appear

---

**If it still doesn't work, please share:**
1. The exact error message from Chrome
2. Screenshot of the error (if possible)
3. What folder you selected when clicking "Load unpacked"

