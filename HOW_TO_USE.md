# 🔧 How to Use Love Dial

## ⚠️ Important: Chrome Extension Popup Limitation

**Chrome extensions cannot programmatically open the popup from a content script.** This is a Chrome security restriction.

## ✅ How It Works Now

### **Step 1: Click "Call" Button on LinkedIn**
1. Go to any LinkedIn profile
2. Click the pink "💕 Call" button (top right)
3. Button will show "✅ Click extension icon!"
4. Profile data is now stored

### **Step 2: Open Extension Popup**
1. **Click the Love Dial extension icon** in your Chrome toolbar
2. The popup will open and show the profile data
3. You can now generate voice preview and romantic score

## 🎯 Why This Design?

- Chrome security: Content scripts can't open popups
- User control: User must click extension icon (security feature)
- Data is stored: Profile is saved when you click "Call" button
- Popup reads stored data: When you open popup, it shows the profile

## 🔄 Alternative: We Could Use a Modal Instead

If you want the popup to open automatically, we could:
- Create a modal/overlay on the LinkedIn page itself
- Show the profile info directly on the page
- No need to click extension icon

**Would you like me to implement the modal approach instead?**

---

## 🧪 Testing Steps

1. **Click "Call" button** on LinkedIn profile
2. **See success message**: "✅ Click extension icon!"
3. **Click extension icon** in Chrome toolbar
4. **Popup opens** with profile data
5. **Test voice generation** and **romantic score**

---

**The extension is working! Just need to click the extension icon after clicking the Call button.** 🎉

