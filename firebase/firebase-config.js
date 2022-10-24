import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCCnr_0H5wogpCXKAB2n8bYcyoPNHHtqGA',
  authDomain: 'metrolapp.firebaseapp.com',
  projectId: 'metrolapp',
  storageBucket: 'metrolapp.appspot.com',
  messagingSenderId: '307021842549',
  appId: '1:307021842549:web:8ac0887c7bf7d5cf41103c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// create db
export const db = getFirestore(app)
export const storage = getStorage(app)
