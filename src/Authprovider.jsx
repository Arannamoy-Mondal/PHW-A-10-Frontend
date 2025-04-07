import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
export const Authcontext = createContext()
const Authprovider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUser(user)
                
                // ...
            } else {
                setUser(null)
                // User is signed out
                // ...
            }
            setLoading(false)
        });

        return () => { subscribe() }
    }, [])

    const createAccount = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }


    const googleProvider = new GoogleAuthProvider();

    const googleAuthentication = () => {
        setLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user1 = result.user;
                setUser(user1)
                console.log(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const logOut = () => {
        setLoading(true)
        signOut(auth).then(() => {
            // setUser(null)
            
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    const authInfo = { user, setUser, googleAuthentication, createAccount ,logOut,loading}
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;