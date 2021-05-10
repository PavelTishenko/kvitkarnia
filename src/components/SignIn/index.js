import React, {useState, useEffect} from 'react';
import './styles.scss';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';
import AuthWrapper from '../AuthWraper';
import {Link, useHistory} from 'react-router-dom';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import { emailSingInStart, googleSignInStart } from '../../redux/User/user.actions';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Signin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(mapState);
    const [initState, setInitState] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(currentUser) {
            resetForm();
            // dispatch(resetAllAuthForms())
            history.push('/')
        }
    }, [currentUser])

    const resetForm = () => {
        setInitState({
            email: '',
            password: ''
        })
    };

    const handleSubmit =  e => {
        e.preventDefault();
        dispatch(emailSingInStart({email, password}));
        // setInitState({
        //     ...initState
        // });
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInitState({
            ...initState,
            [name]: value
        });
    }
    const handleGoogleSignin = () => {
        dispatch(googleSignInStart());
    }
    const {email, password} = initState;
    const configAuthWrapper = {
        headline: 'LogIn'
    };
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='fromWrap'>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={handleChange}
                        />
                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={handleChange}
                        />
                        <Button type="submit">
                            Login
                        </Button>
                        <div className='socialSignin'>
                            <div className='row'>
                                <Button onClick={handleGoogleSignin}>
                                    Sign in with GOOGLE
                                </Button>
                            </div>
                        </div>
                        <div className="links">
                            <Link to='/recovery'>
                                Reset password
                            </Link>
                        </div>
                    </form>
                </div>
        </AuthWrapper>     
    )
    
}

export default Signin;
