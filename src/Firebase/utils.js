import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import {firebaseConfig} from './firebase';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// For loagin with google account
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});

export const handleUserProfile = ({userAuth, additionalData}) => {
    if(!userAuth) return;
    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot =  userRef.get();

    if(!snapshot.exists) {
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        try{
             userRef.set({
                displayName,
                email,
                createDate: timestamp,
                ...additionalData
            })
        } catch (err) {
            console.log(err);
        }
    }
    return userRef;
}