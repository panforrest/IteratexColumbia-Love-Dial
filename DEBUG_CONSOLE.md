# 🔍 How to See Console Logs

## ⚠️ Important: Check the RIGHT Console!

When debugging Chrome extensions, you need to check **TWO different consoles**:

### **1. Page Console (LinkedIn page)**
This is where the content script logs appear!

**Steps:**
1. Go to the LinkedIn profile page
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Click the "Call" button
5. **Look for logs starting with "Love Dial:"**

### **2. Extension Console (Background script)**
This is for background service worker logs.

**Steps:**
1. Go to `chrome://extensions/`
2. Find "Love Dial" extension
3. Click **"service worker"** link (or "Inspect views: service worker")
4. This opens a console for the background script

---

## 🧪 Testing Steps

1. **Reload Extension:**
   - Go to `chrome://extensions/`
   - Click reload icon on "Love Dial"

2. **Open Page Console:**
   - Go to LinkedIn profile
   - Press F12
   - Go to Console tab

3. **Click "Call" Button:**
   - You should see logs like:
     - `Love Dial: LinkedIn detector loaded`
     - `Love Dial: Call button clicked!`
     - `Love Dial: Starting profile extraction...`
     - `Love Dial: Found name: [name]`
     - etc.

4. **Check What Happens:**
   - If you see "Profile extracted successfully" → Modal should appear
   - If you see "Failed to extract profile" → LinkedIn DOM might have changed

---

## 🐛 Common Issues

### **No logs at all:**
- Make sure you're looking at the **page console** (F12 on LinkedIn page)
- Not the extension popup console
- Reload the extension first

### **"Failed to extract profile":**
- LinkedIn's HTML structure might be different
- Check the console for what selectors failed
- We added fallback selectors, but LinkedIn changes their DOM often

### **Modal doesn't appear:**
- Check console for "Modal created successfully"
- If you see an error, share it with me

---

## 📋 What to Share

If it's still not working, please share:
1. **All console logs** (copy/paste from F12 console)
2. **What happens** when you click the button
3. **Screenshot** if possible

---

**After rebuilding, reload the extension and try again!**

