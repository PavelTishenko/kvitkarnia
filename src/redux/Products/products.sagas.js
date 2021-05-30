import {auth} from './../../Firebase/utils';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import {setProducts, fetchProductsStart} from './products.actions';
import {handleAddProduct, handleFetchProducts, handleDeleteProduct} from './products.helpers';
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
        yield put(fetchProductsStart());
    } catch (error) {
        console.log(error);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({payload: {
    filterType
}}){
    try {
        const products = yield handleFetchProducts({filterType});
        yield put(setProducts(products));
    } catch (error) {
        console.log(error);
    }
}

export function* onFetchProducts(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({payload}) {
    try {
        yield handleDeleteProduct(payload);
        yield put(fetchProductsStart());
    } catch (error) {
        console.log(error);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}


export default function* productsSagas(){
    yield all([
        call(onAddProductStart),
        call(onFetchProducts),
        call(onDeleteProductStart)
    ])
}