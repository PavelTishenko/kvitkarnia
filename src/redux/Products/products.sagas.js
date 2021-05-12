import {auth} from './../../Firebase/utils';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import {setProducts} from './products.actions';
import {handleAddProduct, handleFetchProducts} from './products.helpers';
import productsTypes from './products.types';

export function* addProduct({payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}){
    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
    } catch (error) {
        console.log(error);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts(){
    try {
        const products = yield handleFetchProducts();
        yield put(setProducts(products))
    } catch (error) {
        console.log(error);
    }
}

export function* onFetchProducts(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export default function* productsSagas(){
    yield all([
        call(onAddProductStart),
        call(onFetchProducts)
    ])
}