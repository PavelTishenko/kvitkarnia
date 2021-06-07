import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductStart, setProduct} from './../../redux/Products/products.actions';
import Button from '../Forms/Button';

import './styles.scss';

const mapState = (state) => ({
    product: state.productsData.product
})

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const {productID} = useParams();
    const {product} = useSelector(mapState);
    useEffect(() => {
        dispatch(fetchProductStart(productID))
        return () => {
            dispatch(setProduct({}))
        }
    }, [])
    const {
        productName,
        productThumbnail,
        productPrice
    } = product;
    const configAddToCardBtn = {
        type: 'button',

    }
    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>{productPrice} GRN</span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCardBtn}>
                                Резервувати
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
            TEST
            Product: {productName}
        </div>
    );
};

export default ProductCard;
