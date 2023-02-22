import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB-YIj6T4k4aB3BUl1-Z1lJW1tbu3M60Mg",
    authDomain: "imageuploadfirebase-e6465.firebaseapp.com",
    projectId: "imageuploadfirebase-e6465",
    storageBucket: "imageuploadfirebase-e6465.appspot.com",
    messagingSenderId: "736893371258",
    appId: "1:736893371258:web:283a8d585ea4684879ccc3"
  };

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();