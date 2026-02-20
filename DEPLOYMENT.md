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
4. **Environment Variables**: Scroll down to the Advanced section and add these variables exactly:
   - `PYTHON_VERSION`: `3.10.0`
   - `DATABASE_URL`: *(Paste the Internal Database URL from step 2)*
   - `SECRET_KEY`: `my-super-secret-key-12345` *(Or any random string you make up)*
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `*` *(We'll restrict this later if needed)*
   - `CORS_ALLOW_ALL_ORIGINS`: `True` *(This solves the chicken/egg problem by allowing any frontend to connect temporarily)*
   - `FIREBASE_CREDENTIALS_PATH`: `/etc/secrets/firebase-adminsdk.json`
5. **Secret Files (Firebase JSON)**: In that same Advanced section, click **Add Secret File**.
   - **Filename**: `firebase-adminsdk.json`
   - **Contents**: Open your `clubify-9e6ed-firebase-adminsdk...json` file from your desktop, copy EVERYTHING inside it, and paste it directly into this box on Render.
6. Click **Create Web Service**. 
7. Render will begin deploying. At the top left, **copy the URL Render gives you** (e.g., `https://clubify-api-xyz.onrender.com`).

---

## 🚀 2. Frontend Deployment (Vercel)

Vercel is the creators of Next.js and provides the best hosting experience for it.

### Setup on Vercel.com
1. Create an account on [Vercel](https://vercel.com/) and link your GitHub.
2. Click **Add New...** > **Project** and select your repository.
3. Configure the Project:
   - **Framework Preset:** Next.js (Vercel detects this)
   - **Root Directory:** Edit this and select the `frontend` folder (Very Important!).
4. **Environment Variables**: Expand the environment variables tab and paste the exact URL you copied from Render in Step 1, adding `/api` to the end of it:
   - `NEXT_PUBLIC_API_URL`: `https://clubify-api-xyz.onrender.com/api`
5. Click **Deploy**.

Vercel will install dependencies, build the Next.js app, and provide you with your final live, public URL (e.g., `https://clubify-frontend-abc.vercel.app`)!

---

## 🔗 3. Security Lockdown (Optional but Recommended)

Once both are deployed and your app is working flawlessly on Vercel, you can optionally go back to Render and lock down the security:
1. In your Render Web Service `clubify-api`, go to the "Environment" tab.
2. Change `CORS_ALLOW_ALL_ORIGINS` to `False`.
3. Add a new variable `CORS_ALLOWED_ORIGINS` and set it to your exact Vercel URL (e.g., `https://clubify-frontend-abc.vercel.app`). 
4. Render will redeploy and now only your specific Vercel site can talk to your database!
