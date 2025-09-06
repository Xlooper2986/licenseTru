# OpenLightWeb (Firebase) - README

This project is a static front-end for a playful "terminal" page that asks the visitor's name,
shows a faux hacking-style log, and stores **name + IP + city + country + userAgent + time**
in Firebase Firestore.

## What you must do (quick setup)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable **Authentication** -> Sign-in method -> **Google**.
3. Enable **Firestore Database** (start in production mode and set rules per README).
4. In Project Settings -> SDK setup, copy your Firebase config (apiKey, authDomain, projectId).
5. Replace `FIREBASE_CONFIG` placeholders in `script.js` and `admin.html`.
6. Deploy the site to **GitHub Pages** (push repository to GitHub, enable Pages from `gh-pages` or `main`).
7. Admin setup:
   - In `admin.html`, sign-in once with your Google account after setting config. Open browser console -> note `user.uid`.
   - Put that UID into `admin.html` constant `ADMIN_UID`.
   - For stronger security, update Firestore rules (see below).

## Security notes (must read)
- Client-side Firebase config is public (apiKey). Rely on Firestore security rules to protect reads/writes.
- Minimal recommended Firestore rules (example):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /openlight_logs/{doc} {
      allow create: if true;                       // anyone can write a log entry
      allow read: if request.auth != null && request.auth.uid == 'YOUR_ADMIN_UID';
    }
  }
}
```
- This makes writes open (so your page can log visitors) but restricts reads to an authenticated admin UID.

## Files
- index.html — main page
- style.css — styling
- script.js — front-end logic (replace FIREBASE_CONFIG)
- admin.html — admin panel to view logs (requires Google sign-in and ADMIN_UID)
