import React from 'react';
import './styles.scss';
import {useParams} from 'react-router-dom';

const ProductCard = ({}) => {
    const {productID} = useParams();
    return (
        <div>
            TEST
            Product ID: {productID}
        </div>
    );
};

export default ProductCard;
