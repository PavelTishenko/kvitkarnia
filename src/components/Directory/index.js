import React from 'react';
import Bukets from '../../assets/bukets.jpg';
import Homes from '../../assets/home.jpg';
import './styles.scss'
const Directory = (props) => {
    return(
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Bukets})`
                    }}
                >
                    <a>Shop Bukets</a>
                </div>
                <div
                className="item"
                    style={{
                        backgroundImage: `url(${Homes})`
                    }}
                >
                    <a>Shop Homes Plants</a>
                </div>
            </div>
        </div>
    );
}
export default Directory;