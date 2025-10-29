# Step-by-Step Guide to Deploy Your MERN Portfolio on Vercel

This guide will walk you through deploying both your frontend (React) and backend (Express) to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub Account**: Your code should be on GitHub
3. **MongoDB Atlas Account**: For cloud database (or your MongoDB connection string)

---

## Step 1: Prepare Your Code

✅ **Already Done!** The following files have been updated:
- `backend/src/app.js` - Now exports the Express app for serverless functions
- `frontend/src/utils/api.js` - Uses environment variable for API URL
- `frontend/vercel.json` - Configured for React app
- `backend/vercel.json` - Configured for Express serverless

---

## Step 2: Push Your Code to GitHub

If your code isn't on GitHub yet:

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   ```

2. **Create a GitHub repository**:
   - Go to GitHub and create a new repository
   - Don't initialize with README (unless you want to merge)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 3: Deploy Backend to Vercel

### 3.1 Create Backend Project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. **Important**: We'll deploy backend and frontend as separate projects

### 3.2 Configure Backend Deployment

1. **Root Directory**: Set to `backend`
   - Click "Edit" in the Root Directory field
   - Type: `backend`
   - Click outside to save

2. **Environment Variables**: Add these:
   - `MONGO_URI`: Your MongoDB connection string
     - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - `NODE_ENV`: `production`
   - `PORT`: Leave empty (Vercel handles this)

3. **Framework Preset**: Leave as "Other" or select "Node.js"

4. **Build Settings**:
   - Build Command: Leave empty (or `npm install`)
   - Output Directory: Leave empty
   - Install Command: `npm install`

5. Click **"Deploy"**

### 3.3 Get Your Backend URL

After deployment:
- Your backend will be live at: `https://your-backend-project.vercel.app`
- Copy this URL - you'll need it for the frontend!

### 3.4 Test Your Backend

Visit: `https://your-backend-project.vercel.app/api/health`

You should see: `{"status":"OK","message":"Server is running"}`

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Frontend Project on Vercel

1. Still in Vercel dashboard, click **"Add New"** → **"Project"**
2. Import the **same GitHub repository** again
3. This time we'll deploy it as a separate frontend project

### 4.2 Configure Frontend Deployment

1. **Root Directory**: Set to `frontend`
   - Click "Edit" in the Root Directory field
   - Type: `frontend`
   - Click outside to save

2. **Environment Variables**: Add this:
   - `REACT_APP_API_URL`: Your backend URL + `/api/portfolio`
     - Example: `https://your-backend-project.vercel.app/api/portfolio`
   - Make sure there's **NO trailing slash** at the end

3. **Framework Preset**: Select **"Create React App"** (Vercel will auto-detect)

4. **Build Settings** (usually auto-filled):
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. Click **"Deploy"**

### 4.3 Get Your Frontend URL

After deployment:
- Your frontend will be live at: `https://your-frontend-project.vercel.app`

---

## Step 5: Update Backend CORS (If Needed)

If you encounter CORS errors, update `backend/src/app.js`:

```javascript
app.use(cors({
    origin: [
        'https://your-frontend-project.vercel.app',
        'http://localhost:3000' // for local development
    ],
    credentials: true
}));
```

Then redeploy the backend.

---

## Step 6: Verify Everything Works

1. **Test Backend**: 
   - Visit: `https://your-backend-project.vercel.app/api/health`

2. **Test Frontend**:
   - Visit: `https://your-frontend-project.vercel.app`
   - Check browser console for errors
   - Try creating/reading portfolio items

3. **Test API Connection**:
   - Open browser DevTools → Network tab
   - Check if API calls are going to the correct backend URL

---

## Troubleshooting

### Issue: Backend not connecting to MongoDB

**Solution**: 
- Double-check `MONGO_URI` environment variable in Vercel
- Make sure your MongoDB Atlas IP whitelist allows all IPs: `0.0.0.0/0`
- Check MongoDB connection string format

### Issue: Frontend shows "Network Error" or can't reach backend

**Solution**:
- Verify `REACT_APP_API_URL` in frontend environment variables
- Make sure backend URL doesn't have trailing slash
- Check CORS settings in backend

### Issue: Build fails on Vercel

**Solution**:
- Check build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Issue: "Function not found" error

**Solution**:
- Ensure `backend/src/app.js` exports the app: `module.exports = app;`
- Check that `vercel.json` routes to correct file

---

## Quick Reference

### Backend Environment Variables:
```
MONGO_URI=mongodb+srv://...
NODE_ENV=production
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=https://your-backend.vercel.app/api/portfolio
```

### URLs:
- Backend: `https://your-backend-project.vercel.app`
- Frontend: `https://your-frontend-project.vercel.app`

---

## Next Steps

- [ ] Set up custom domains (optional)
- [ ] Add environment-specific configurations
- [ ] Set up CI/CD for automatic deployments
- [ ] Monitor your deployments in Vercel dashboard

---

## Important Notes

1. **Separate Projects**: Frontend and backend are deployed as **separate Vercel projects** from the same GitHub repo
2. **Root Directory**: Each project uses its own root directory (`frontend` or `backend`)
3. **Environment Variables**: Must be set in each project's settings on Vercel
4. **Redeployment**: Every push to your main branch will trigger automatic redeployment (if connected)

---

## Need Help?

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Discord Community
- Check deployment logs in Vercel dashboard

Good luck with your deployment! 🚀

