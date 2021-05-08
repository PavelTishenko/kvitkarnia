import userTypes from './user.types';
import {auth, handleUserProfile, GoogleProvider} from './../../Firebase/utils';


export const emailSingInStart = userCredentials => {
    return {
        type: userTypes.EMAIL_SIGN_IN_STRAT,
        payload: userCredentials
    }
};

export const signInSuccess = user => {
    console.log(user);
    return {
        type: userTypes.SIGN_IN_SUCCES,
        payload: user
    }
};

export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION,
})

export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
})

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const signInUser = ({email, password}) => async dispatch => {
    // try {
    //     await auth.signInWithEmailAndPassword(email, password);
    //     dispatch({ 
    //         type: userTypes.SIGN_IN_SUCCES, 
    //         payload: true
    //     })
    // } catch (err) {
    //     console.log(err);
    // }
};

export const singUpUser = ({displayName, email, password, confirmPassword}) => async dispatch => {
     if(password !== confirmPassword) {
            const err = ['Password Don\'t match'];
            dispatch({
                type: userTypes.SING_UP_ERROR,
                payload: err
            })
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });
            dispatch({
                type: userTypes.SIGN_UP_SUCCESS,
                payload: true
            })
        } catch (err){
            // console.log(err);
        }
};

export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url:'http://localhost:3000/login'
    } 
    try {
            // TODO
            // Change this url from live       
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log('Password Reset');
                    dispatch({
                        type: userTypes.RESET_PASSWORD_SUCCESS,
                        payload: true
                    });
                    // props.history.push('/login');
                })
                .catch(() => {
                    console.log('Something went wrong');
                    const err = ['Email not found. Please try again.']
                    dispatch({
                        type: userTypes.RESET_PASSWORD_ERROR,
                        payload: err
                    })
                })
        } catch (err) {
            // console.log(err);
        }
}

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({ 
                    type: userTypes.SIGN_IN_SUCCES, 
                    payload: true
                })
            })
    } catch (err) {
        // console.log(err);
    }
} ;

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
});
