/*
Firebase Configuration and Initialization

resources: https://firebase.google.com/docs/web/setup
           https://firebase.google.com/docs/web/learn-more#config-object 
*/


import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
//import { getFirestore } from "firebase/firestore"


// configuration to use Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4isCTOeGCdkipD6x1gwE-18dPVabQwPQ",
    authDomain: "crowd-source-travel-planner.firebaseapp.com",
    projectId: "crowd-source-travel-planner",
    storageBucket: "crowd-source-travel-planner.firebasestorage.app",
    messagingSenderId: "529605673659",
    appId: "1:529605673659:web:143ebca2a95400ffbd5f9e",
    measurementId: "G-7SJW6M2DQX"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// initialize and export firebase auth service
// for user registration, user login and logout, and authentication state monitoring 
export const auth = getAuth(app)

// initialize and export firestore db
//export const db = getFirestore(app)
export const db = null

export default app