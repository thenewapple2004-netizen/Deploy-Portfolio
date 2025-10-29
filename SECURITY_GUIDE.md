# Security Guide for GitHub Deployment

## ✅ What You Should Do Before Pushing to GitHub

### 1. **NEVER Commit `.env` Files**

Your `.env` files contain sensitive information like:
- MongoDB connection strings with passwords
- API keys
- Secret tokens

**These files are now in `.gitignore`** - Git will automatically ignore them when you commit.

### 2. **Check for Sensitive Data in Your Code**

Before pushing, make sure you don't have:
- Hardcoded passwords or connection strings
- API keys in your source code
- Database credentials in config files

If you find any, move them to `.env` files (which are gitignored).

### 3. **Use `.env.example` Files Instead**

I've created `env.example` files in both `backend/` and `frontend/` folders.
- ✅ **Commit these** - They show what environment variables are needed
- ❌ **Never commit `.env` files** - They contain actual secrets

### 4. **Steps Before Your First Commit**

```bash
# 1. Check if you have any .env files
# If you do, make sure they're not tracked by Git
git status

# 2. If .env files show up, remove them from Git tracking (but keep the file)
git rm --cached backend/.env
git rm --cached frontend/.env

# 3. Verify .gitignore is working
git status  # .env files should NOT appear

# 4. Now you're safe to commit
git add .
git commit -m "Initial commit"
```

---

## 🔒 Security Checklist

Before pushing to GitHub, verify:

- [ ] No `.env` files are in your repository
- [ ] `.gitignore` includes `.env` patterns
- [ ] No passwords or API keys in source code
- [ ] MongoDB connection string is only in local `.env` (not committed)
- [ ] `env.example` files exist and are committed (these are safe templates)

---

## 📝 Setting Up Environment Variables

### For Local Development:

1. **Backend**: Copy `backend/env.example` to `backend/.env` and fill in your values:
   ```bash
   cp backend/env.example backend/.env
   ```
   Then edit `backend/.env` with your actual MongoDB connection string.

2. **Frontend**: Copy `frontend/env.example` to `frontend/.env` and update:
   ```bash
   cp frontend/env.example frontend/.env
   ```
   For local development, keep `http://localhost:5000/api/portfolio`

### For Vercel Deployment:

1. **Backend Environment Variables** (set in Vercel dashboard):
   - `MONGO_URI` - Your MongoDB connection string
   - `NODE_ENV` - Set to `production`

2. **Frontend Environment Variables** (set in Vercel dashboard):
   - `REACT_APP_API_URL` - Your backend URL: `https://your-backend.vercel.app/api/portfolio`

**Never put these in GitHub!** They go in Vercel's environment variables section.

---

## 🚨 What to Do If You Accidentally Committed Secrets

If you accidentally committed a `.env` file or sensitive data:

### Option 1: If you haven't pushed yet
```bash
# Remove from Git but keep the file
git rm --cached backend/.env
git rm --cached frontend/.env

# Amend your last commit
git commit --amend
```

### Option 2: If you already pushed
```bash
# Remove from Git history (this rewrites history!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env frontend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history - coordinate with team!)
git push origin --force --all
```

**Better solution**: Change all your passwords/API keys since they may be exposed!

---

## ✅ Current Status

✅ `.gitignore` files created in:
- Root directory
- `backend/` directory  
- `frontend/` directory

✅ `env.example` files created (safe to commit):
- `backend/env.example`
- `frontend/env.example`

✅ All `.env` patterns are ignored:
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

---

## 🎯 Summary

**DO:**
- ✅ Commit `env.example` files (templates)
- ✅ Use `.env` files locally (they're gitignored)
- ✅ Set environment variables in Vercel dashboard
- ✅ Review `git status` before committing

**DON'T:**
- ❌ Commit `.env` files
- ❌ Put secrets in source code
- ❌ Share `.env` files publicly
- ❌ Put MongoDB passwords in GitHub

Your project is now secure! 🎉

