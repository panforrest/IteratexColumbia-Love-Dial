# 🧪 Test with API Keys - Full Flow

## ✅ Step 1: Rebuild Extension

Since you updated the API keys, you need to rebuild:

```bash
cd "/home/peter-pan/Iterate x Columbia Love Dial"
npm run build
```

This compiles your changes with the new API keys.

---

## ✅ Step 2: Reload Extension in Chrome

1. Go to `chrome://extensions/`
2. Find "Love Dial" extension
3. Click the **reload icon** (circular arrow)
4. ✅ Extension reloaded with new API keys

---

## ✅ Step 3: Test Full Flow

### **A. Test Voice Preview**

1. Go to LinkedIn profile: https://www.linkedin.com/in/jitender-thakur-nyc/
2. Click the pink "💕 Call" button
3. Modal should appear
4. Click **"🎤 Generate Voice Preview"** button
5. **Expected**: 
   - Button shows "Generating..." with spinner
   - After a few seconds, audio player appears
   - You can click play to hear the AI-generated voice!

### **B. Test Romantic Score**

1. In the same modal (or reload and click Call button again)
2. Click **"💖 Get Romantic Score"** button
3. **Expected**:
   - Button shows "Analyzing..." with spinner
   - After a few seconds, you see:
     - Romantic Compatibility score (e.g., "85/100")
     - 2-3 insights about compatibility

---

## 🐛 Troubleshooting

### **If Voice Preview Fails:**

**Check console (F12):**
- Look for error messages
- Common issues:
  - API key incorrect → "401 Unauthorized"
  - Rate limit → "429 Too Many Requests"
  - Network error → Check internet connection

**Verify API key:**
- Make sure key is in quotes: `'sk-...'`
- No extra spaces
- Key is complete

### **If Romantic Score Fails:**

**Check console (F12):**
- Look for error messages
- Common issues:
  - API key incorrect → "401 Unauthorized"
  - Invalid model → Check Anthropic API version
  - Rate limit → Wait a moment and try again

**Verify API key:**
- Make sure key is correct
- Check Anthropic dashboard for usage limits

---

## ✅ Success Indicators

**Voice Preview:**
- ✅ Audio player appears
- ✅ You can play the audio
- ✅ Voice sounds natural

**Romantic Score:**
- ✅ Score appears (number/100)
- ✅ Insights appear below score
- ✅ Formatting looks good

---

## 🎤 Demo Flow

For your hackathon demo:

1. **Open LinkedIn profile**
2. **Click "Call" button** → Modal appears
3. **Click "Generate Voice Preview"** → Show AI voice generation
4. **Play audio** → "Wow" moment!
5. **Click "Get Romantic Score"** → Show AI analysis
6. **Explain**: "This uses ElevenLabs for voice and Anthropic Claude for analysis"

---

**Ready to test! Rebuild and reload, then try it out!** 🚀

