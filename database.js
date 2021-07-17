import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE__API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE__API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE__PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE__STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE__MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
};

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;
