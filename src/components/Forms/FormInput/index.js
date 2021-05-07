import React from 'react';
import './styles.scss';

 const FormInput = ({ handleChange, label, ...ohterProps}) => {
    return (
        <div className='formRow'>
            {label && (
                <label>
                    {label}
                </label>
            )}
            <input className='formInput' onChange={handleChange} {...ohterProps}/>
        </div>
    );
};

export default FormInput;
