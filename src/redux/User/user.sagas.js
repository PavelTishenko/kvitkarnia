import {takeLatest, all, call, put} from 'redux-saga/effects';
import userTypes from './user.types';
import {signInSuccess} from './user.actions';
import {auth, handleUserProfile, GoogleProvider} from './../../Firebase/utils';

// put - dispatch an action into the store(non-blocking)
// call - run method, Promise or other Saga (blocking)
// takeEvery - run multiple sagas. When one of the sagas finishes,
// all the other sagas are canceled
// takeLatest - takes every matching action and run the given saga, 
// but cancels every previous 

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

export function* emailSignIn({ payload: { email, password } }){
    try {
       const {user} = yield auth.signInWithEmailAndPassword(email, password);
       yield getSnapshotFromUserAuth(user); 
       
        
    } catch (err) {
        console.log(err);
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_STRAT, emailSignIn)
}

export default function* userSagas(){
    yield all([call(onEmailSignInStart)])
}