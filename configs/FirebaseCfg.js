// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_KEY,
  authDomain: 'ai-video-gen-b5941.firebaseapp.com',
  projectId: 'ai-video-gen-b5941',
  storageBucket: 'ai-video-gen-b5941.firebasestorage.app',
  messagingSenderId: '673979789026',
  appId: '1:673979789026:web:249933ae32318a6ffd78bb',
  measurementId: 'G-P2HGEF29E3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
