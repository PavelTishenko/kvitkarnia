import React, { useEffect, useState } from 'react';
import './styles.scss';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWraper';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {singUpUser, resetAllAuthForms} from './../../redux/User/user.actions';

const mapState = ({user}) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = ({history}) => {
    const dispatch = useDispatch();
    const {signUpSuccess, signUpError} = useSelector(mapState);
    const [initS, setInitS] = useState({
        displayName: '',
        email: '',
        password:'',
        confirmPassword: '',
        errors: []
    })

    useEffect(() => {
        if (signUpSuccess){
            setInitS({
                displayName: '',
                email: '',
                password:'',
                confirmPassword: '',
                errors: []
            })
            dispatch(resetAllAuthForms());
            history.push('/');
        }
    }, [signUpSuccess])

    useEffect(() => {
        if(Array.isArray(signUpError) && signUpError.length > 0) {
            setInitS({
                ...initS,
                errors: signUpError
            })
        }
    }, [signUpError])
    

    const handleChange = (e) => {
        const {value, name} = e.target;
        setInitS({
            ...initS,
            [name]: value
        })
    }
    const handleFormSubmit = event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword, errors} = initS;
        dispatch(singUpUser({displayName, email, password, confirmPassword}));
        setInitS({
            ...initS
        })
    }
    const {displayName, email, password, confirmPassword, errors} = initS;
    const configAuthWrapper = {
        headline: 'Registration'
    }
    return (
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => (
                                <li key={index}>
                                    {err}
                                </li>
                            ))}
                        </ul>
                    )}
                        <form onSubmit={handleFormSubmit}>
                            <FormInput 
                                type="text"
                                name='displayName'
                                value={displayName}
                                placeholder="Full name"
                                onChange={handleChange}
                            />
                            <FormInput 
                                type="email"
                                name='email'
                                value={email}
                                placeholder="email"
                                onChange={handleChange}
                            />
                            <FormInput 
                                type="password"
                                name='password'
                                value={password}
                                placeholder="password"
                                onChange={handleChange}
                            />
                            <FormInput 
                                type="password"
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={handleChange}
                            />
                            <Button type='submit'>
                                Register
                            </Button>
                        </form>
                    </div>
            </AuthWrapper> 
    );
};
export default withRouter(SignUp);
// const initState = {
//     displayName: '',
//     email: '',
//     password:'',
//     confirmPassword: ''
// }

// export default class SignUp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...initState
//         };
//         this.handleChange = this.handleChange.bind(this);
//     }
//     handleChange(e) {
//         const {name, value} = e.target;
//         this.setState({
//             [name]: value
//         })
//     }
//     render() {
//         const {displayName} = this.state;
//         return (
//             <div className='signup'>
//                 <div className='wrap'>
//                     <h2>SignUp</h2>
//                     <form>
//                         <FormInput 
//                             type="text"
//                             name='displayName'
//                             value={displayName}
//                             placeholder="Full name"
//                             onChange={this.handleChange}
//                         />
//                     </form>
//                 </div>
//             </div>
//         );
//     };
// };
