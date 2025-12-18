# 🚀 Quick GitHub Upload - Command Reference

## Step-by-Step Commands

### 1️⃣ Install Git (if not installed)
Download: https://git-scm.com/download/win
**Then restart VS Code!**

---

### 2️⃣ Initialize Git & Make First Commit

```powershell
# Navigate to project
cd c:\Employee_Management

# Initialize git
git init

# Configure your identity (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Employee Management System - React + Spring Boot"
```

---

### 3️⃣ Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `employee-management-system`
3. Keep it **Public** or choose **Private**
4. ❌ Do NOT add README, .gitignore, or license
5. Click **"Create repository"**

---

### 4️⃣ Connect & Push to GitHub

```powershell
# Add GitHub remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example with actual username:**
```powershell
git remote add origin https://github.com/johndoe/employee-management-system.git
git branch -M main
git push -u origin main
```

---

### 5️⃣ Future Updates

```powershell
# After making code changes:
git add .
git commit -m "Description of changes"
git push
```

---

## 🔐 Authentication

When prompted for credentials:
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (not your GitHub password!)

**Get Token:** https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select: ✅ repo
- Copy the token and use it as password

---

## ✅ Verify Upload

After pushing, check: `https://github.com/YOUR_USERNAME/employee-management-system`

You should see:
- ✅ All code files
- ✅ README.md displayed
- ✅ No `node_modules/` or `target/` folders (excluded by .gitignore)

---

## 🆘 Troubleshooting

**Problem:** "git: command not found"
**Solution:** Install Git and restart terminal

**Problem:** Authentication failed
**Solution:** Use Personal Access Token instead of password

**Problem:** Large files warning
**Solution:** Already handled - .gitignore excludes large folders

---

## 📋 What Gets Uploaded

✅ Source code (Java, React)
✅ Configuration files
✅ SQL files
✅ Documentation
❌ node_modules/ (excluded)
❌ target/ (excluded)
❌ Build outputs (excluded)

---

**Need detailed instructions?** See [GITHUB_UPLOAD_GUIDE.md](GITHUB_UPLOAD_GUIDE.md)
