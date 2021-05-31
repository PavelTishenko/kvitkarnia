import {firestore} from './../../Firebase/utils';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve()
            })
            .catch(err => reject(err))
    });
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 6;
        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);
        if( filterType ) ref = ref.where('productCategory', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc);   
        ref
            .get()
            .then(snapshot => {
                const tatoalCount = snapshot.size;
                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];
                resolve({
                    data,
                    queryDoc: snapshot.docs[tatoalCount - 1],
                    isLastPage: tatoalCount < 1
                });
            })
            .catch(err => reject(err))
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => resolve())
            .catch(err => reject(err))
    })
}