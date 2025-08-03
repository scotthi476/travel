/*
Firebase Configuration and Initialization

resources: https://firebase.google.com/docs/web/setup
           https://firebase.google.com/docs/web/learn-more#config-object 
*/

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// configuration to use Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// initialize and export firebase auth service
// for user registration, user login and logout, and authentication state monitoring
export const auth = getAuth(app)

export const db = null

export default app
