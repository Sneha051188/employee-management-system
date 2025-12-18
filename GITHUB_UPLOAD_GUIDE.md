# 📤 GitHub Upload Guide - Employee Management System

## Prerequisites

### 1. Install Git
Download and install Git from: https://git-scm.com/download/win

During installation:
- ✅ Select "Git from the command line and also from 3rd-party software"
- ✅ Use default settings for line endings
- ✅ After installation, **restart VS Code**

### 2. Create GitHub Account (if you don't have one)
Go to: https://github.com/signup

---

## 🚀 Steps to Upload to GitHub

### Step 1: Initialize Git Repository

Open a new terminal in VS Code (after restarting) and run:

```powershell
cd c:\Employee_Management
git init
```

### Step 2: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Create .gitignore File

A `.gitignore` file is already created below (see the file in the root directory).
It will exclude unnecessary files like `node_modules/`, build outputs, and IDE files.

### Step 4: Add All Files

```powershell
git add .
```

### Step 5: Create Initial Commit

```powershell
git commit -m "Initial commit: Full-stack Employee Management System with React + Spring Boot"
```

### Step 6: Create GitHub Repository

1. Go to GitHub: https://github.com/new
2. Repository name: `employee-management-system` (or your preferred name)
3. Description: `Full-stack Employee Management System built with React 19, Spring Boot 3.5.6, and MySQL`
4. Choose **Public** or **Private**
5. ❌ **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click **"Create repository"**

### Step 7: Connect to GitHub and Push

After creating the repository, GitHub will show you commands. Use these:

```powershell
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/johndoe/employee-management-system.git
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub credentials or use a Personal Access Token.

---

## 🔑 GitHub Authentication Options

### Option A: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Select scopes: ✅ `repo` (full control of private repositories)
4. Generate and **copy the token**
5. When pushing, use the token as your password

### Option B: GitHub CLI (Alternative)

```powershell
# Install GitHub CLI from: https://cli.github.com/
gh auth login
# Follow the prompts to authenticate
```

---

## 📁 What Will Be Uploaded

### Backend (`ems-backend/`)
- ✅ Java source code (Spring Boot controllers, services, entities)
- ✅ Maven configuration (`pom.xml`)
- ✅ SQL files (sample data, migrations)
- ✅ Application properties
- ❌ `target/` folder (excluded - build output)

### Frontend (`full-stack-app/ems-frontend/`)
- ✅ React components (pages, dashboards)
- ✅ CSS files (animations, styles)
- ✅ API integration code
- ✅ Vite configuration
- ❌ `node_modules/` (excluded - will be reinstalled with `npm install`)
- ❌ `dist/` (excluded - build output)

### Documentation
- ✅ README files
- ✅ Setup guides
- ✅ Architecture documentation

---

## 🔄 Future Updates

After making changes to your code:

```powershell
# Check what changed
git status

# Add changed files
git add .

# Commit with a message
git commit -m "Add new feature: XYZ"

# Push to GitHub
git push
```

---

## 🆘 Common Issues

### Issue: "Git is not recognized"
**Solution:** Install Git and restart VS Code/Terminal

### Issue: "Permission denied (publickey)"
**Solution:** Use HTTPS instead of SSH, or set up SSH keys

### Issue: "Failed to push some refs"
**Solution:** Pull first: `git pull origin main --rebase`, then push again

### Issue: Large file warning
**Solution:** Already handled in `.gitignore` - node_modules and build folders are excluded

---

## 📊 Repository Structure on GitHub

```
employee-management-system/
├── .gitignore
├── README.md
├── QUICK_START.md
├── package.json
├── ems-backend/
│   ├── src/
│   ├── pom.xml
│   └── sample_data.sql
└── full-stack-app/
    └── ems-frontend/
        ├── src/
        ├── package.json
        └── vite.config.js
```

---

## ✅ Verification

After pushing, verify on GitHub:
1. Go to: `https://github.com/YOUR_USERNAME/employee-management-system`
2. Check that all files are visible
3. README should display automatically
4. Verify `.gitignore` is working (no `node_modules/` or `target/` folders)

---

## 🎯 Quick Command Summary

```powershell
# One-time setup
git init
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# First commit
git add .
git commit -m "Initial commit: Employee Management System"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "Your change description"
git push
```

---

**Need Help?** Check the [GitHub Documentation](https://docs.github.com/en/get-started/quickstart)
