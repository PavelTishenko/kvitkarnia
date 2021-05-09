import userTypes from './user.types';

const INIT_STATE = {
    currentUser: null,
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
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case userTypes.USER_ERROR:
            return {
                ...state,
                userErrors: action.payload
            }
        default: 
            return state;
    }
};

export default userReducer;