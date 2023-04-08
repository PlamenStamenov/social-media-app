import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASRhLTRoVMTMHEEbj5uAwHJjbWPCsqhoY",
  authDomain: "social-media-app-69cd0.firebaseapp.com",
  projectId: "social-media-app-69cd0",
  storageBucket: "social-media-app-69cd0.appspot.com",
  messagingSenderId: "72253991668",
  appId: "1:72253991668:web:2149f12c19c08018c7cca1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Set Firebase Authentication to persistent
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase Authentication is now persistent');
  })
  .catch((error) => {
    console.log('Firebase Authentication could not be set to persistent');
  });

export { auth };

export const storage = getStorage(app);
export const db = getFirestore(app);