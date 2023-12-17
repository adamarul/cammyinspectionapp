// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8E_yGKJblSomKtdOy91HKE2_p8hQiHhs",
  authDomain: "cammy-s-inspection-app.firebaseapp.com",
  projectId: "cammy-s-inspection-app",
  storageBucket: "cammy-s-inspection-app.appspot.com",
  messagingSenderId: "445348588271",
  appId: "1:445348588271:web:47e2c0795bcb4c1fd5c91a",
  measurementId: "G-3TH7248JHN",
};

// Initialize Firebase only if no apps currently exist
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const analytics = getAnalytics(app);