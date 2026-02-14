# 🔧 Fix: Extension Loading Error

## ✅ All Files Are Present

I verified all required files exist:
- ✅ `src/background/background.js` - exists
- ✅ `src/content/linkedin-detector.js` - exists  
- ✅ `src/popup/popup.html` - exists
- ✅ `icons/icon16.png` - exists
- ✅ `manifest.json` - valid JSON

## 🔍 Try These Steps

### **Step 1: Make Sure You're Loading the Right Folder**
- The folder to load is: `/home/peter-pan/Iterate x Columbia Love Dial/dist`
- **NOT** the `src` folder
- **NOT** the root project folder

### **Step 2: Check Chrome Error Details**
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Try loading the extension
4. Click on the error message to see full details
5. Check the console for more info

### **Step 3: Verify Path**
Make sure you're selecting the `dist` folder, not a parent folder.

### **Step 4: Rebuild (if needed)**
```bash
cd "/home/peter-pan/Iterate x Columbia Love Dial"
npm run build
```

Then try loading again.

---

## 🚨 Common Issues

### **Issue: "Could not load background script"**
- **Cause**: Path mismatch or file doesn't exist
- **Fix**: Verify `dist/src/background/background.js` exists

### **Issue: "Could not load manifest"**
- **Cause**: Invalid JSON or missing fields
- **Fix**: JSON is valid, but try rebuilding

### **Issue: Extension loads but doesn't work**
- **Cause**: Files not in right location
- **Fix**: Make sure all files are in `dist/` folder

---

## ✅ Quick Test

Run this to verify everything:
```bash
cd "/home/peter-pan/Iterate x Columbia Love Dial/dist"
ls -la src/background/background.js
ls -la src/content/linkedin-detector.js
ls -la src/popup/popup.html
ls -la icons/icon16.png
ls -la manifest.json
```

All should show files exist.

---

**If it still doesn't work, share the exact error message from Chrome!**

