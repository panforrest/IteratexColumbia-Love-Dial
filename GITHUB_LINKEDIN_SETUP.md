# 🚀 GitHub Setup Instructions for LinkedIn Account

## Step-by-Step Guide to Create and Push Love-Dial Repository

### Prerequisites
- ✅ Git repository already initialized
- ✅ All code committed locally
- ✅ GitHub account access (LinkedIn GitHub account)

---

## 📋 Step 1: Create Repository on GitHub

1. **Go to GitHub**
   - Navigate to: https://github.com/new
   - Or go to: https://github.com → Click the **"+"** icon → **"New repository"**

2. **Repository Settings**
   - **Repository name**: `Love-Dial` (or `love-dial`)
   - **Description**: `Chrome Extension for LinkedIn - AI voice previews and romantic compatibility scores`
   - **Visibility**: 
     - Choose **Public** (for hackathon submission)
     - Or **Private** (if you prefer)
   - **⚠️ IMPORTANT**: 
     - ❌ **DO NOT** check "Add a README file"
     - ❌ **DO NOT** check "Add .gitignore"
     - ❌ **DO NOT** check "Choose a license"
   - (We already have these files in our local repo)

3. **Click "Create repository"**

---

## 📋 Step 2: Get Repository URL

After creating the repository, GitHub will show you a page with setup instructions.

**Copy the repository URL**. It will look like one of these:
- HTTPS: `https://github.com/linkedin/Love-Dial.git`
- SSH: `git@github.com:linkedin/Love-Dial.git`

**Note**: Replace `linkedin` with the actual GitHub organization/username.

---

## 📋 Step 3: Add Remote and Push (Terminal Commands)

Open your terminal and run these commands:

```bash
# Navigate to project directory
cd "/home/peter-pan/Iterate x Columbia Love Dial"

# Add the GitHub remote (replace URL with your actual repository URL)
git remote add origin https://github.com/linkedin/Love-Dial.git

# Verify remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

---

## 📋 Step 4: Authentication

When you run `git push`, you may be prompted for credentials:

### Option A: Personal Access Token (Recommended)

1. **Create a Personal Access Token**:
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Give it a name: `Love-Dial-Push`
   - Select scopes: Check **`repo`** (full control of private repositories)
   - Click **"Generate token"**
   - **⚠️ Copy the token immediately** (you won't see it again!)

2. **Use the token**:
   - When prompted for **Username**: Enter your GitHub username
   - When prompted for **Password**: Paste the Personal Access Token (not your actual password)

### Option B: SSH Key (Alternative)

If you prefer SSH:
```bash
# Change remote to SSH
git remote set-url origin git@github.com:linkedin/Love-Dial.git

# Push (no password needed if SSH key is set up)
git push -u origin main
```

---

## 📋 Step 5: Verify Upload

1. **Check GitHub**:
   - Go to: `https://github.com/linkedin/Love-Dial`
   - You should see all your files

2. **Verify in terminal**:
   ```bash
   git log --oneline
   git remote -v
   ```

---

## 📋 Step 6: Add Repository Description (Optional)

On the GitHub repository page:
1. Click the **⚙️ Settings** gear icon (or go to repository settings)
2. Scroll down to **"About"** section
3. Add:
   - **Description**: `Chrome Extension for LinkedIn - AI voice previews and romantic compatibility scores`
   - **Topics**: `chrome-extension`, `linkedin`, `elevenlabs`, `anthropic`, `ai`, `hackathon`, `typescript`, `react`

---

## 📋 Step 7: Update README on GitHub (Optional)

The README.md should already be in the repository. GitHub will automatically display it on the main page.

---

## ✅ Success Checklist

- [ ] Repository created on GitHub
- [ ] Remote added (`git remote -v` shows origin)
- [ ] Code pushed successfully (`git push` completed)
- [ ] Files visible on GitHub repository page
- [ ] README.md displays correctly
- [ ] Repository description added

---

## 🔧 Troubleshooting

### Error: "remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/linkedin/Love-Dial.git
```

### Error: "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Check that the token has `repo` scope enabled
- Verify your GitHub username is correct

### Error: "Permission denied"
- Check that you have write access to the repository
- Verify the repository URL is correct
- If it's an organization repo, ensure you're a member with write access

### Error: "Repository not found"
- Verify the repository name and organization/username are correct
- Check that the repository exists on GitHub
- Ensure you have access to the repository

---

## 📦 Quick Reference Commands

```bash
# Check current status
git status
git remote -v
git log --oneline

# Add and push (if you make changes later)
git add .
git commit -m "Your commit message"
git push origin main
```

---

**Need help?** Check the repository URL and make sure you have the correct permissions on the LinkedIn GitHub account.

