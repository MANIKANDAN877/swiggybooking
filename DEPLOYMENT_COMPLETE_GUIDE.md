# Complete Deployment Guide

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub (recommended)

### 1.2 Create New Web Service
1. Click "New" -> "Web Service"
2. Connect your GitHub repository: `MANIKANDAN877/swiggybooking`
3. Configure the service:
   - **Name**: `swiggy-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Branch**: `main`

### 1.3 Environment Variables
Add these environment variables in Render dashboard:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swiggy-clone
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

### 1.4 Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Your backend URL will be: `https://swiggy-backend.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub (recommended)

### 2.2 Import Project
1. Click "New Project"
2. Import your GitHub repository: `MANIKANDAN877/swiggybooking`
3. Configure the project:
   - **Framework Preset**: `React`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 2.3 Environment Variables (if needed)
```
NODE_ENV=production
```

### 2.4 Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your frontend URL will be: `https://swiggybooking.vercel.app`

---

## Step 3: Update API Endpoints

### 3.1 Update Frontend API URL
Your frontend is already configured to use the Render backend:
- Production: Uses `https://swiggybooking.onrender.com`
- Development: Uses `http://localhost:5000`

### 3.2 Test the Connection
After both deployments are live:
1. Visit your frontend: `https://swiggybooking.vercel.app`
2. Check browser console for any CORS errors
3. Verify restaurants load correctly

---

## Step 4: Final Testing

### 4.1 Test Backend
Visit these URLs to test:
- `https://swiggybooking.onrender.com/` - API status
- `https://swiggybooking.onrender.com/api/health` - Health check
- `https://swiggybooking.onrender.com/api/restaurants` - Restaurants endpoint

### 4.2 Test Frontend
Visit `https://swiggybooking.vercel.app` and test:
- Restaurant loading
- Search functionality
- Cart operations
- Contact form
- Responsive design

---

## Expected URLs After Deployment

### Backend (Render)
- **API URL**: `https://swiggybooking.onrender.com`
- **Health Check**: `https://swiggybooking.onrender.com/api/health`
- **Restaurants**: `https://swiggybooking.onrender.com/api/restaurants`

### Frontend (Vercel)
- **Main App**: `https://swiggybooking.vercel.app`
- **About Page**: `https://swiggybooking.vercel.app/about`
- **Cart**: `https://swiggybooking.vercel.app/cart`

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Backend CORS is configured to allow all origins
   - Make sure backend is deployed first

2. **Database Connection**
   - Ensure MongoDB URI is correct in Render environment variables
   - Check MongoDB Atlas IP whitelist

3. **Build Failures**
   - Check build logs in Render/Vercel dashboards
   - Ensure all dependencies are installed

4. **API Not Working**
   - Verify backend deployment is successful
   - Check API endpoints manually

---

## Features After Deployment

- Restaurant browsing with food-specific images
- Search and filtering functionality
- Shopping cart system
- User authentication
- Contact form
- Responsive design
- Performance optimizations
- CORS configured for cross-origin requests

## Support

If you encounter any issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Ensure both services are running

---

**Your Swiggy clone will be live at:**
- Frontend: `https://swiggybooking.vercel.app`
- Backend: `https://swiggybooking.onrender.com`
