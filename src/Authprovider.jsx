import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
export const Authcontext = createContext()
const Authprovider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // console.log(user, user.metadata.creationTime);
                setUser(user)
                // setLoading(false)
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
        // setLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user1 = result.user;
                setUser(user1)
                const name = user1.displayName
                const email = user1.email
                const totalDonation = 0
                const created_time = Date()

                fetch(`https://phw-a-10-backend.vercel.app/user/email/${email}`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.isExist == false) {
                            fetch("https://phw-a-10-backend.vercel.app/user/", {
                                method: "POST",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify({ name, email, totalDonation, created_time })
                            })
                            .then(res => res.json())
                        }
                    })
                    





                // console.log(user.email, user.displayName);


                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
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


    const forgetPassword = (email) => {
        // setLoading(true)
        return sendPasswordResetEmail(auth, email);
    }


    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo = { user, setUser, googleAuthentication, createAccount, logOut, loading, forgetPassword, login }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;