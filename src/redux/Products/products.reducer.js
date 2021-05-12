import  productsTypes from './products.types';

const initState = {
    products: []
}

const productsReducer = (state = initState, action) => {
    switch(action.type) {
        case productsTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
};

export default productsReducer;