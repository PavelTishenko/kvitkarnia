import React, {useState, useEffect} from 'react';
import AuthWrapper from '../AuthWraper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword, resetAllAuthForms} from './../../redux/User/user.actions';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = (props) => {
    const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [init, setInit] = useState({
        email: '',
        errors: []
    });
    const configAuthWrapper = {
        headline: 'Email Password'
    }
    const handleChange = (e) => {
        const {value, name} = e.target;
        setInit({
            ...init,
            [name]: value
        })
    }
    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    }, [resetPasswordSuccess])
    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setInit({
                ...init,
                errors: resetPasswordError
            })
        }
    }, [resetPasswordError])
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPassword({email}));
    }
    const {email, errors} = init;
    useEffect(() => {
        console.log(init);
    }, [errors]);
  
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => (
                            <li key={index}>
                                {e}
                            </li>
                        ))}
                    </ul>
                )}
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    );
};
export default withRouter(EmailPassword);
