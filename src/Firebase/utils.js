import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import {firebaseConfig} from './firebase';
import userTypes from '../redux/User/user.types';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// For loagin with google account
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});

export const handleUserProfile = async ({userAuth, additionalData}) => {
    if(!userAuth) return;
    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        console.log('not exist');
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        const userRole = ['user'];
        try{
             await userRef.set({
                displayName,
                email,
                createDate: timestamp,
                userRole,
                ...additionalData
            })
        } catch (err) {
            console.log(err);
        }
    }
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((res, rej) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            res(userAuth);
        }, rej);
    })
}
