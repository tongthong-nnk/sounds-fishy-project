# DEPLOYMENT_AGENT

Last updated milestone: Milestone 14

## Responsibility

- Owns README setup instructions.
- Owns Firebase setup guide.
- Owns Vercel deployment guide.
- Owns `.env.example` clarity.
- Owns common errors and fixes.

## Current Decisions

- Deployment target is Vercel free tier.
- Database target is Firebase Firestore.
- No custom domain is required.
- No paid services are required.
- Firebase config will use `NEXT_PUBLIC_*` environment variables.
- `.env.local` must not be committed.

## Constraints

- Do not include real secrets in source files.
- Keep instructions beginner-friendly.
- Call out private-MVP limitations honestly.
- Keep the private MVP deployable on free-tier Firebase and Vercel.

## Milestone Notes

### Milestone 0

Created initial deployment guide structure and environment variable list.

### Milestone 3

Completed:

- Add `.env.example` with all Firebase web config keys.
- Expand Firebase setup guide with console steps.
- Explain `.env.local` creation.
- Document local verification and common missing-env errors.
- Keep Vercel deployment as later setup guidance, not a deployed milestone.
- README now lists the Firebase values to paste.

### Milestone 13

Planned scope:

- Finalize README setup instructions.
- Finalize Firebase setup guide.
- Finalize Vercel deployment guide.
- Clarify `.env.example`.
- Add common deployment errors and fixes.

Completed:

- README now includes quick start, Firebase setup, validation, and Vercel deployment notes.
- `docs/DEPLOYMENT_GUIDE.md` now covers install, Firebase project setup, Firebase web app config, Firestore setup, `.env.local`, local run, GitHub, Vercel, environment variables, friend testing, and common errors.
- `.env.example` now explains that `NEXT_PUBLIC_*` values are Firebase browser config values.
- Firestore rules notes explain the private-MVP security tradeoff.

### Milestone 14

Planned scope:

- Ensure final QA includes Vercel deployment behavior.
- Ensure final QA reminds the user to publish current Firestore rules before testing.
- Keep deployment instructions beginner-friendly.

Completed:

- Final QA checklist includes GitHub push, Vercel redeploy, Vercel environment variables, deployed create/join flow, realtime updates, scoring, result reveal, and next round.
- Deployment notes remain free-tier and private-MVP focused.
- Firestore rules documentation now matches the tested permissive private-MVP rules under `rooms`.

## Open Questions

- None.

## Last Updated Milestone

Milestone 14
