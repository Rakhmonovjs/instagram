import {initializeApp} from "firebase/app";
import {getAuth,onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { toast } from "react-hot-toast";
import { userHandle } from "./unils";
import {getFirestore, getDoc, setDoc, doc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDqzvpm0rC4aoZ0grFG73CW5XF3kSiZTCc",
    authDomain: "asadbekramm.firebaseapp.com",
    databaseURL: "https://asadbekramm-default-rtdb.firebaseio.com",
    projectId: "asadbekramm",
    storageBucket: "asadbekramm.appspot.com",
    messagingSenderId: "1087464291269",
    appId: "1:1087464291269:web:00821b23628b4303d729ac",
    measurementId: "G-CQ6L1M8F5Z"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db= getFirestore()

onAuthStateChanged(auth, async user => {
    if(user) {
        const dbUser = await getDoc(doc(db, "users", user.uid))
        let data ={
            uid:user.uid,
            fullName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            ...dbUser.data()
        }
        userHandle(data)
    } else {
    userHandle(user || false)
    }
})

export const login = async ( email, password) => {
    try {
       return await signInWithEmailAndPassword(auth, email, password)
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