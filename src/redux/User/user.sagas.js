import {takeLatest, all, call, put} from 'redux-saga/effects';
import userTypes from './user.types';
import {signInSuccess, signOutUserSuccess, userError} from './user.actions';
import {auth, handleUserProfile, GoogleProvider, getCurrentUser} from './../../Firebase/utils';

// put - dispatch an action into the store(non-blocking)
// call - run method, Promise or other Saga (blocking)
// takeEvery - run multiple sagas. When one of the sagas finishes,
// all the other sagas are canceled
// takeLatest - takes every matching action and run the given saga, 
// but cancels every previous 

// worker
export function* getSnapshotFromUserAuth(user, additionalData={}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch (error) {
        // console.log(error);
    }
}
// worker
export function* emailSignIn({ payload: { email, password } }){
    try {
       const {user} = yield auth.signInWithEmailAndPassword(email, password);
       yield getSnapshotFromUserAuth(user); 
       
        
    } catch (err) {
        console.log(err);
    }
}
// watcher
export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_STRAT, emailSignIn)
}

export function* userSignUp({payload: {
    displayName,
    email,
    password,
    confirmPassword
}}) {
    if(password !== confirmPassword) {
        const err = ['Password Don\'t match'];
        yield put(userError(err));
        return;
    }
    try {
        console.log('norm');
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        // yield call(handleUserProfile, {userAuth: user, additionalData: { displayName }});
        const additionalData = { displayName };
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch (err){
        // console.log(err);
    }

}

export function* onUserSignUpStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, userSignUp)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        console.log(error);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess());
    } catch (error) {
        console.log(error);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}


export default function* userSagas() {
    yield all([
        call(onUserSignUpStart),
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart)
    ])
}