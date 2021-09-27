import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbjzI6R1lPi3sDilWUiGPWtGELgwo5RO0",
    authDomain: "invoice-app-a97e0.firebaseapp.com",
    projectId: "invoice-app-a97e0",
    storageBucket: "invoice-app-a97e0.appspot.com",
    messagingSenderId: "1082444761016",
    appId: "1:1082444761016:web:acdedd0d544e52eae7f14d"
}
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export { firebaseApp, db }
