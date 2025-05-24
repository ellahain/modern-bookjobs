import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAy-AUPrp8Pbs-FV-5Cj2hKmu5Kf6Off8A",
  authDomain: "modern-bookjobs.firebaseapp.com",
  projectId: "modern-bookjobs",
  storageBucket: "modern-bookjobs.firebasestorage.app",
  messagingSenderId: "431452301554",
  appId: "1:431452301554:web:2311feb566462f9e78086b",
  measurementId: "G-J4N5CV8375"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
