import {initializeApp} from "firebase/app";
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword, signOut} from "firebase/auth";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore"
import { toast } from "react-hot-toast";
import { userHandle } from "./unils";


const firebaseConfig = {
  apiKey: "AIzaSyDqzvpm0rC4aoZ0grFG73CW5XF3kSiZTCc",
  authDomain: "asadbekramm.firebaseapp.com",
  projectId: "asadbekramm",
  storageBucket: "asadbekramm.appspot.com",
  messagingSenderId: "1087464291269",
  appId: "1:1087464291269:web:492d9c0c8db298d2d729ac",
  measurementId: "G-PXY18S2RPD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, user => {
    userHandle(user || false)
})

export const login = async ( email, password) => {
    try {
       const responce = await signInWithEmailAndPassword(auth, email, password)
    }catch (err) {
        toast.error(err.code)
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
    } catch(err) {
        toast.error(err.code)
    }
}

// signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         const user = userCredential.user;
//     })

//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });