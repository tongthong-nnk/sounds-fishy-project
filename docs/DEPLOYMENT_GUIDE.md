# Deployment Guide

Last updated milestone: Milestone 14

This guide is the source of truth for Firebase and Vercel setup for the private MVP.

## Complete Setup Checklist

Follow these steps in order:

1. Install dependencies.
2. Create a Firebase project.
3. Add a Firebase web app.
4. Create a Firestore database.
5. Add `.env.local`.
6. Run locally.
7. Create a GitHub repository.
8. Push code to GitHub.
9. Deploy to Vercel.
10. Add environment variables to Vercel.
11. Test with friends.
12. Use the common errors section if anything fails.

## 1. Install Dependencies

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd install
```

PowerShell note: use `npm.cmd`, not `npm`, if script execution policy blocks the npm PowerShell shim.

## 2. Create Firebase Project

1. Go to the Firebase console.
2. Create a new Firebase project.
3. A Google Analytics setting is not required for this app.
4. Open the project after Firebase finishes setup.

## 3. Add Firebase Web App

1. Open Project settings.
2. In the General tab, add a web app.
3. Register the app with a clear name, such as `sounds-fishy-web`.
4. Open SDK setup and config.
5. Keep this page open so you can copy the config values into `.env.local`.

## 4. Create Firestore Database

1. In Firebase Console, open Firestore Database.
2. Click Create database.
3. Choose production mode.
4. Choose a nearby region.
5. After creation, open the Rules tab.
6. Replace the rules with this project's root `firestore.rules`.
7. Publish the rules.

The current rules are acceptable for a small private friend group. They are not production-grade rules for a public app because this MVP intentionally has no real authentication.

## Environment Variables

The app will read Firebase browser config from `NEXT_PUBLIC_*` values.

Expected `.env.local` values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Notes:

- These are normal Firebase web app config values.
- Do not commit `.env.local`.
- Do not place private service account keys in the app.
- The app currently builds without `.env.local` because Firebase initializes lazily.
- Room creation, joining, realtime play, and deployed game actions require these variables.

## 5. Add `.env.local`

Run:

```powershell
cd E:\sounds-fishy-project
Copy-Item .env.example .env.local
```

Paste the Firebase config values from Firebase Console > Project settings > General > Your apps > SDK setup and config.

Mapping from Firebase config to `.env.local`:

| Firebase config key | `.env.local` key |
| --- | --- |
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |

Example shape:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123
```

## 6. Run Locally

```powershell
cd E:\sounds-fishy-project
npm.cmd install
npm.cmd run dev
```

Then open the local URL shown by Next.js, usually `http://localhost:3000`.

Local validation:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

## Firestore Rules

`firestore.rules` lives at the project root.

To publish manually:

1. Open Firebase Console.
2. Go to Firestore Database.
3. Open the Rules tab.
4. Replace the rules with the contents of `firestore.rules`.
5. Publish.

These rules allow private MVP reads and writes under the `rooms` tree while closing unrelated collections. Because there is no auth, they should not be used for a public app.

What the rules do:

- Allow unauthenticated room and player reads, lists, creates, and updates under `rooms`.
- Keep the rules permissive enough for joins, player fallback lookup, realtime player listing, transactions, and presence heartbeats.
- Block room and player deletes.
- Block all unrelated collections.
- Include comments explaining the private-MVP security tradeoff.

What the rules do not do:

- They do not prove host identity.
- They do not prove player identity.
- They do not validate room-code shape or player document ID shape.
- They do not prevent a person with the room code from writing to that room.
- They do not provide public-app security.

## 7. Create GitHub Repository

Create a new empty GitHub repository. Do not add a README from GitHub if you plan to push this existing folder as-is.

## 8. Push Code To GitHub

If this folder is not already a Git repository:

```powershell
cd E:\sounds-fishy-project
git init
git add .
git commit -m "Initial private party game"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

If the folder is already a Git repository, use your normal `git add`, `git commit`, and `git push` workflow.

## 9. Deploy To Vercel

1. Sign in to Vercel.
2. Import the GitHub repository.
3. Select the Next.js project.
4. Keep the framework preset as Next.js.
5. Deploy on the free tier.

The first deployment may fail if environment variables are not set yet. Add them in the next step, then redeploy.

## 10. Add Environment Variables To Vercel

Add these values in Vercel project settings:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Redeploy after adding or changing environment variables.

## 11. Test With Friends

After deployment:

1. Open the Vercel deployment URL.
2. Create a room as host.
3. Share the room code or room link privately.
4. Have at least 3 friends join.
5. Start the game.
6. Play one full round.
7. Confirm answers, reveal flow, guesses, scoring, result reveal, and next round work.
8. Refresh during lobby, answering, guessing, and result to confirm player identity persists.

Use separate browsers, profiles, or devices when testing multiple players. Browser sessions sharing the same localStorage may reuse and update the same player identity.

## Common Errors And Fixes

### Missing Firebase Environment Variables

Symptom:

- Firebase fails to initialize or room actions fail.

Fix:

- Confirm `.env.local` exists locally.
- Confirm all `NEXT_PUBLIC_FIREBASE_*` values are set.
- Restart `npm.cmd run dev` after changing `.env.local`.
- Confirm Vercel environment variables are set for deployed builds.
- Redeploy after changing Vercel environment variables.

### Firestore Not Enabled

Symptom:

- Room creation or joining fails.

Fix:

- Open Firebase console.
- Enable Firestore Database.
- Confirm the project ID matches `.env.local`.

### Firestore Permission Denied

Symptom:

- Reads or writes fail with permission errors.

Fix:

- Check `firestore.rules`.
- Confirm rules were published in Firebase console.
- Confirm the room code uses six uppercase letters/numbers.
- For this private MVP, rules are intentionally simple and documented.

### Invalid Room Code

Symptom:

- Joining a room fails immediately.

Fix:

- Use the six-character room code generated by the app.
- Do not include spaces or punctuation.

### Vercel Build Fails

Symptom:

- Vercel fails during build or shows missing package errors.

Fix:

- Confirm `package-lock.json` is committed.
- Confirm Vercel is using the repo root as the project root.
- Confirm the build command is `npm run build` or Vercel's default Next.js build.

### Deployed App Opens But Room Actions Fail

Symptom:

- Home page renders, but Create Room or Join Room fails.

Fix:

- Confirm all `NEXT_PUBLIC_FIREBASE_*` values exist in Vercel Project Settings.
- Confirm the values match the same Firebase project where Firestore is enabled.
- Redeploy after adding the variables.
- Confirm Firestore rules were published.

### Wrong Project Folder

Symptom:

- Commands do not find package files or docs.

Fix:

```powershell
cd E:\sounds-fishy-project
Get-Location
```

Expected path:

```text
E:\sounds-fishy-project
```

## Deployment Responsibility

`DEPLOYMENT_AGENT` owns this guide, `.env.example`, README setup instructions, Firebase setup notes, Vercel deployment notes, and common errors.
