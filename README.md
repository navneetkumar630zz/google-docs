# Google Docs
A google docs clone made with:
- [Next JS](https://nextjs.org)
- [nextAuth](https://next-auth.js.org)
- firebase
- [Draft JS](https://draftjs.org) | [react-draft-wysiwyg](https://www.npmjs.com/package/react-draft-wysiwyg)
- [Material UI](https://material-ui.com)

## Getting Started
- Create a file named `.env.local` in the root directory.
- Add these variables there
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - NEXTAUTH_URL
  - NEXT_PUBLIC_FIREBASE__API_KEY
  - NEXT_PUBLIC_FIREBASE__AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE__PROJECT_ID
  - NEXT_PUBLIC_FIREBASE__STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE__MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE__APP_ID
- Install the packages

```bash
yarn install
```
- Start the devlopment server
```bash
yarn dev
```
- The server will on [http://localhost:3000](http://localhost:3000)