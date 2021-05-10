import React, {useState, useEffect} from 'react';
import AuthWrapper from '../AuthWraper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordStart, resetUserState} from './../../redux/User/user.actions';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userError: user.userError
})

const EmailPassword = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {resetPasswordSuccess, userError} = useSelector(mapState);
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
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess])
    useEffect(() => {
        if(Array.isArray(userError) && userError.length > 0) {
            setInit({
                ...init,
                errors: userError
            })
        }
    }, [userError])
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));
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
export default EmailPassword;
