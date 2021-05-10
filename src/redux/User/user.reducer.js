import userTypes from './user.types';

const INIT_STATE = {
    currentUser: null,
    resetPasswordSuccess: false,
    userErrors: []
};

const userReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case userTypes.SIGN_IN_SUCCES:
            return {
                ...state,
                currentUser: action.payload,
                userErrors: []
            }
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INIT_STATE
            }
        case userTypes.USER_ERROR:
            return {
                ...state,
                userErrors: action.payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        default: 
            return state;
    }
};

export default userReducer;