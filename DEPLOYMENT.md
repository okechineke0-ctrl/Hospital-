# Deployment Guide

## Hospital Management System - Free Hosting Setup

### Prerequisites
- GitHub account
- Railway account (free tier with $5 credit)
- Vercel account (free)
- MongoDB Atlas account (free tier)

---

## Step 1: Set Up Database (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up with email or GitHub
3. Create a new project
4. Create a cluster (select "M0 Free" tier)
5. Wait for cluster to be created (~5 minutes)

### 1.2 Get Connection String
1. Click "Connect" button
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>` and `<password>` with your credentials
5. Replace `<dbname>` with `hospital`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hospital?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend on Railway

### 2.1 Push Your Code to GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 2.2 Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `Hospital-` repository
6. Railway auto-detects it's a Node.js project

### 2.3 Set Environment Variables in Railway
1. Go to your project → Variables
2. Add the following variables:

```
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_change_this
DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hospital?retryWrites=true&w=majority
```

### 2.4 Get Backend URL
1. Go to "Deployments"
2. Click on your deployment
3. You'll see a domain like: `https://hospital-production-xxxx.railway.app`
4. Copy this URL (you'll need it for frontend)

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Update Backend URL
1. Open `frontend/src/services/api.js`
2. Update `VITE_API_URL` to your Railway backend URL:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hospital-production-xxxx.railway.app/api'
```

3. Push to GitHub:
```bash
git add frontend/src/services/api.js
git commit -m "Update API URL for production"
git push origin main
```

### 3.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your `Hospital-` repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Set Environment Variables in Vercel
1. Go to "Settings" → "Environment Variables"
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://hospital-production-xxxx.railway.app/api`
3. Click "Deploy"

---

## Step 4: Test Your Deployment

### 4.1 Frontend Access
- Your frontend will be available at: `https://your-project.vercel.app`

### 4.2 Test Login
1. Go to your Vercel URL
2. Click "Register"
3. Create a new account
4. Login with your credentials
5. Try booking an appointment

### 4.3 Check Backend
```bash
curl https://hospital-production-xxxx.railway.app/api/health
```

You should see:
```json
{"status":"Server is running"}
```

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Railway Backend | $5 credit | $0 (covered by credit) |
| Vercel Frontend | Unlimited | $0 |
| MongoDB Atlas | 512MB | $0 |
| **Total** | | **$0** |

> Railway gives you $5/month credit - enough for a small project!

---

## Troubleshooting

### Backend not connecting
- Check if `DB_URL` is correct in Railway
- Check if `JWT_SECRET` is set
- View logs in Railway dashboard

### Frontend showing errors
- Check browser console (F12)
- Make sure `VITE_API_URL` is correct
- Verify backend is running

### CORS errors
- Backend already has CORS enabled
- Make sure frontend URL is on internet

---

## Local Development

### Run Backend Locally
```bash
cd backend
copy .env.example .env
# Edit .env with your MongoDB URL
npm install
npm run dev
```

### Run Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

Access at `http://localhost:3000`

---

## Update Deployments

Just push to GitHub and both services auto-update!

```bash
git add .
git commit -m "Your changes"
git push origin main
```

---

## Need Help?

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Docs: [docs.mongodb.com](https://docs.mongodb.com)
