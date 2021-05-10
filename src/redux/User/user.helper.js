import {auth} from '../../Firebase/utils';

export const handleResetPasswordAPI = (email) => {
    const config = {
        url:'http://localhost:3000/login'
    }
    return new Promise((res, rej) => {
        // TODO
        // Change this url from live       
        auth.sendPasswordResetEmail(email, config)
            .then(() => {
                console.log('Password Reset');
                res();
                // props.history.push('/login');
            })
            .catch(() => {
                console.log('Something went wrong');
                const err = ['Email not found. Please try again.']
                rej(err);
            })

    })
}