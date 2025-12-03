import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from '../Context/AuthContext';



const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Email sign up
    const createUserWithEmailAndPasswordFunction = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update profile
        const updateUserProfile = (profile)=>{
        return updateProfile(auth.currentUser, profile)
    }


    //   Google Login
    const signInWithPopupGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // login with email and password
    const signInWithEmailAndPasswordFunction = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // user signout 
    const signOutUserFunction = () => {
        setLoading(true);
        return signOut(auth);
    };
    //  password reset 
    const sendPasswordResetEmailFunction = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };















    const authInfo = {
        user,
        setUser,
        createUserWithEmailAndPasswordFunction,
        updateUserProfile,
        loading,
        setLoading,
        signInWithPopupGoogle,
        signInWithEmailAndPasswordFunction,
        sendPasswordResetEmailFunction,
        signOutUserFunction,





    };


    useEffect(() => {
        const unsubscrive = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscrive();
        }
    }, []);



















    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;