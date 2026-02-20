# Clubify Deployment Guide

This document outlines the step-by-step process for deploying the Clubify platform to production. Because this is a decoupled architecture, we will deploy the **Next.js Frontend to Vercel** and the **Django Backend to Render**.

---

## 🏗️ 1. Backend Deployment (Render)

Render is an excellent platform for hosting Python APIs and PostgreSQL databases.

### A. Prepare the Codebase (Already Done)
We have already updated the codebase to be production-ready:
1. Added `gunicorn`, `dj-database-url`, and `whitenoise` to `requirements.txt`.
2. Updated `clubify_backend/settings.py` to securely parse environment variables.
3. Created a `build.sh` script to automate dependency installation, static file collection, and database migrations.

### B. Setup on Render.com
1. Create an account on [Render](https://render.com/).
2. Click **New +** and select **PostgreSQL**.
   - Name it `clubify-db`.
   - Click **Create Database**. 
   - Once created, copy the **Internal Database URL**.
3. Click **New +** again and select **Web Service**.
   - Connect your GitHub repository containing this code.
   - **Name:** `clubify-api`
   - **Environment:** `Python 3`
   - **Build Command:** `./build.sh`
   - **Start Command:** `gunicorn clubify_backend.wsgi:application`
   - **Tier:** Free or Starter.
4. **Environment Variables**: Scroll down to the Advanced section and add these variables:
   - `PYTHON_VERSION`: `3.10.0` (or your preferred version)
   - `DATABASE_URL`: *(Paste the Internal Database URL from step 2)*
   - `SECRET_KEY`: *(Generate a long random string)*
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `clubify-api.onrender.com` (or whatever your Render URL is)
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app`
5. Click **Create Web Service**. Render will now automatically deploy your Django API!

---

## 🚀 2. Frontend Deployment (Vercel)

Vercel is the creators of Next.js and provides the best hosting experience for it.

### Setup on Vercel.com
1. Create an account on [Vercel](https://vercel.com/) and link your GitHub.
2. Click **Add New...** > **Project** and select your repository.
3. Configure the Project:
   - **Framework Preset:** Next.js (Vercel detects this)
   - **Root Directory:** Edit this and select the `frontend` folder (Very Important!).
4. **Environment Variables**: Expand the environment variables tab and add:
   - `NEXT_PUBLIC_API_URL`: `https://clubify-api.onrender.com/api` *(Your Render backend URL + `/api`)*
   - *(If Firebase is configured)* Add the Firebase keys:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - ...and the rest of your Firebase config.
5. Click **Deploy**.

Vercel will install dependencies, build the Next.js app, and provide you with a live URL (e.g., `https://clubify-frontend.vercel.app`).

---

## 🔗 3. Final Connection Check

Once both are deployed:
1. Go back to your Render Web Service `clubify-api`.
2. Update the `CORS_ALLOWED_ORIGINS` environment variable to match your exact Vercel URL (e.g., `https://clubify-frontend.vercel.app`). Let the backend redeploy.
3. Open your Vercel URL and interact with the app. The frontend should seamlessly communicate with the Render API!
