# ✅ GitHub Upload Checklist

## Pre-Upload Preparation

- [x] Project code complete
- [x] `.gitignore` created (excludes node_modules, target, etc.)
- [x] README_GITHUB.md created (rename to README.md after upload)
- [x] Documentation files ready
- [x] SQL sample data included
- [x] Configuration files present

---

## Upload Steps

### □ Step 1: Install Git
- Download from: https://git-scm.com/download/win
- Install with default settings
- **Restart VS Code after installation**

### □ Step 2: Verify Git Installation
Open PowerShell in VS Code and run:
```powershell
git --version
```
Should show: `git version 2.x.x` or similar

### □ Step 3: Initialize Repository
```powershell
cd c:\Employee_Management
git init
```

### □ Step 4: Configure Git (First Time)
```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

### □ Step 5: Stage All Files
```powershell
git add .
```

### □ Step 6: Check What Will Be Committed
```powershell
git status
```
Verify:
- ✅ Source files are included
- ❌ node_modules/ is NOT listed
- ❌ target/ is NOT listed
- ❌ .env files are NOT listed

### □ Step 7: Create First Commit
```powershell
git commit -m "Initial commit: Full-stack Employee Management System"
```

### □ Step 8: Create GitHub Repository
1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `employee-management-system`
   - **Description:** `Full-stack Employee Management System with React 19 and Spring Boot 3.5.6`
   - **Visibility:** Public ✅ (or Private if you prefer)
3. **Important:** Do NOT check any boxes (no README, .gitignore, or license)
4. Click **"Create repository"**
5. **Copy your repository URL** (shown on next page)

### □ Step 9: Get Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `Employee Management Upload`
4. Select scopes: ✅ **repo** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy and save the token** (you won't see it again!)

### □ Step 10: Connect Local to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git
git branch -M main
```

### □ Step 11: Push to GitHub
```powershell
git push -u origin main
```
When prompted:
- **Username:** Your GitHub username
- **Password:** Paste your Personal Access Token (not your GitHub password!)

### □ Step 12: Verify Upload
1. Go to: `https://github.com/YOUR_USERNAME/employee-management-system`
2. Check that all files are there
3. Verify README is displaying
4. Check recent commits

### □ Step 13: Rename README (on GitHub)
1. On GitHub, click `README_GITHUB.md`
2. Click the pencil icon (Edit)
3. Change filename to `README.md`
4. Scroll down and click **"Commit changes"**
5. **Or** delete the old README.md and rename README_GITHUB.md

---

## Post-Upload Tasks

### □ Update Local Repository
```powershell
git pull origin main
```

### □ Add Repository Description (Optional)
On GitHub repository page:
1. Click the gear icon ⚙️ next to "About"
2. Add description
3. Add topics: `react`, `spring-boot`, `java`, `mysql`, `employee-management`, `full-stack`
4. Add website: Your deployment URL (if deployed)

### □ Add .gitattributes (Optional)
Create `.gitattributes` to improve language detection:
```
*.java linguist-language=Java
*.jsx linguist-language=JavaScript
*.sql linguist-language=SQL
```

### □ Enable GitHub Actions (Optional)
Add CI/CD workflows in `.github/workflows/` directory

### □ Add License (Optional)
Create `LICENSE` file with MIT or your preferred license

---

## Future Updates

Whenever you make changes:

```powershell
# 1. Check what changed
git status

# 2. Add all changes
git add .

# 3. Commit with descriptive message
git commit -m "Add new feature: Department analytics"

# 4. Push to GitHub
git push
```

---

## Common Issues & Solutions

### Issue: "git is not recognized"
✅ **Solution:** Git not installed. Download and install, then restart terminal.

### Issue: "fatal: not a git repository"
✅ **Solution:** Run `git init` first.

### Issue: "remote origin already exists"
✅ **Solution:** Remove and re-add: 
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git
```

### Issue: "Authentication failed"
✅ **Solution:** Use Personal Access Token, not your GitHub password.

### Issue: "Large files warning"
✅ **Solution:** Already handled in .gitignore. Check with `git status`.

### Issue: "Refused to merge unrelated histories"
✅ **Solution:** Force pull:
```powershell
git pull origin main --allow-unrelated-histories
```

---

## Files to Upload Checklist

### Backend Files ✅
- [x] Source code (`src/main/java/`)
- [x] Resources (`application.properties`)
- [x] `pom.xml`
- [x] SQL files (`sample_data.sql`)
- [x] Maven wrapper (`mvnw`, `mvnw.cmd`)

### Frontend Files ✅
- [x] Source code (`src/`)
- [x] `package.json`
- [x] `vite.config.js`
- [x] `index.html`

### Documentation ✅
- [x] README files
- [x] Setup guides
- [x] Architecture docs

### Configuration ✅
- [x] `.gitignore`
- [x] `.github/` (if any)

### Excluded (Correct) ❌
- [x] `node_modules/`
- [x] `target/`
- [x] `.env` files
- [x] IDE files (`.vscode/`, `.idea/`)
- [x] Build outputs

---

## 🎉 Success Indicators

You've successfully uploaded when:
- ✅ Repository visible on GitHub
- ✅ All source files present
- ✅ README displays properly
- ✅ No `node_modules/` or `target/` folders
- ✅ Commit history shows your initial commit
- ✅ Can clone the repo on another machine

---

## 📞 Need Help?

- **GitHub Docs:** https://docs.github.com/
- **Git Documentation:** https://git-scm.com/doc
- **Tutorial:** https://guides.github.com/activities/hello-world/

---

**🎯 Quick Command Reference:** See [GITHUB_QUICK_COMMANDS.md](GITHUB_QUICK_COMMANDS.md)

**📖 Detailed Guide:** See [GITHUB_UPLOAD_GUIDE.md](GITHUB_UPLOAD_GUIDE.md)
