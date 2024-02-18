import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE__API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE__API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE__PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE__STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE__MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

