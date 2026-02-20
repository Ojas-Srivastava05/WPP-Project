# Firebase Integration Guide for Clubify

This guide details how to integrate **Firebase Cloud Messaging (FCM)** into the Clubify architecture so that you, as the admin, can blast out push notifications to club members for events.

## Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it "Clubify".
3. Disable Google Analytics (optional, for simplicity).
4. Make sure your project is created.

## Step 2: Get your Admin SDK Keys (For Django Backend)
The Django API needs permission to trigger notifications to your users.
1. In the Firebase Console, go to **Project Settings** (gear icon) > **Service Accounts**.
2. Click **Generate new private key**.
3. A `.json` file will download. **Securely save this file** inside your backend directory (e.g., `WPP-Project/clubify-firebase-adminsdk.json`).
4. **DO NOT commit this file to GitHub**. Add it to your `.gitignore`.

We will use the `firebase-admin` Python library to securely read this JSON file and dispatch notifications whenever you press the "Send Message" button from the Admin Panel.

## Step 3: Set Up the Web App (For Next.js Frontend)
Your users' browsers need to register to receive notifications.
1. In the Firebase Console, go to **Project Overview**. 
2. Click the **Web (</>)** icon to add a new web app. Name it "Clubify Web".
3. Firebase will generate a `firebaseConfig` block. Copy those exact values into your `.env.local` file located in the `frontend/` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key_here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="clubify-xyz.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="clubify-xyz"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="clubify-xyz.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="sender_id_here"
NEXT_PUBLIC_FIREBASE_APP_ID="app_id_here"
```

## Next Steps
Once you have created the project and grabbed those keys, let me know! I will wire up the Next.js `ServiceWorker` to intercept the push notifications and configure the Django admin endpoints to use the `firebase-admin` SDK. This will successfully fulfil the push-notification pipeline.
