import {initializeApp} from "firebase/app";
import {getAuth,onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { toast } from "react-hot-toast";
import { userHandle } from "./unils";
import {getFirestore, getDoc, setDoc, doc} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDqzvpm0rC4aoZ0grFG73CW5XF3kSiZTCc",
  authDomain: "asadbekramm.firebaseapp.com",
  projectId: "asadbekramm",
  storageBucket: "asadbekramm.appspot.com",
  messagingSenderId: "asadbekramm",
  appId: "1:1087464291269:web:492d9c0c8db298d2d729ac",
  measurementId: "G-PXY18S2RPD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db= getFirestore()

onAuthStateChanged(auth, user => {
    if(user) {
        userHandle(user)
    } else {
    userHandle(user || false)
    }
})

export const login = async ( email, password) => {
    try {
       const response = await signInWithEmailAndPassword(auth, email, password)
    }catch (err) {
        toast.error(err.code)
    }
}
export const register = async ( email, password, full_name, username) => {
    try {

        const user = await getDoc(doc(db, "username", username))
        if(user.exists()){
            toast.error(`${username} Username is already in use by someone else.! `)
        } else{

       const response = await createUserWithEmailAndPassword(auth, email, password)
       
        if(response.user){
                    //    console.log('FULL_NAME', full_name)
                    //    console.log('USERNAME', username)
            
                await setDoc(doc(db, "username", username), {
                user_id: response.user.uid
                })
            
                await setDoc(doc(db, "users", response.user.uid),{
                    full_name: full_name,
                    username: username,
                    followers: [],
                    following: [],
                    notification: []
                }) 
                await updateProfile(auth.currentUser, {
                    displayName: full_name
                })
                return response.user
            }
        }   

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