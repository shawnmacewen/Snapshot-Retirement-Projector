# Deployment Guide

This project can be deployed to either GitHub Pages or Render.com.

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Steps:
1. Go to your repository: `https://github.com/shawnmacewen/Snapshot-Retirement-Projector`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be available at: `https://shawnmacewen.github.io/Snapshot-Retirement-Projector/`

### Notes:
- The `.nojekyll` file has been added to prevent Jekyll processing
- No build process needed - it's a static site
- Free for public repositories
- Automatic redeployment on every push to main branch

## Option 2: Render.com

### Steps:
1. Go to [render.com](https://render.com) and sign up/login
2. Click **New +** → **Static Site**
3. Connect your GitHub account and select this repository
4. Render will automatically detect the `render.yaml` configuration
5. Click **Create Static Site**
6. Your site will be deployed at: `https://snapshot-retirement-projector.onrender.com` (or similar)

### Notes:
- Free tier available
- Automatic redeployment on every push
- Custom domains supported
- The `render.yaml` file has been added with the configuration

## Local Development

To test locally before deploying:
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.
