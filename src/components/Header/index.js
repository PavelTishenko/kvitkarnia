import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import './styles.scss';
import Logo from './../../assets/transpLogo.png';
import { signOutUserStart } from '../../redux/User/user.actions';

const Header = () =>  {
    // Redux hook
    const dispatch = useDispatch();
    //  Local state
    const [menuOpen, setMenuOpen] = useState(false);
    const burgerHandler = () => {
        setMenuOpen(!menuOpen);
    };
    const currentUser = useSelector(state => state.user.currentUser);
    
    const logOut = () => {
        dispatch(signOutUserStart());
    }
    return (
        <header className="header">
            <div className="header_wrap">
                <div className="header-logo">
                    <Link to='/'>
                        <img src={Logo}  alt="LOGO" height={220} width={220}/>
                    </Link>
                </div>
                <div className="header-logo-hide">
                    <Link to='/'>
                        <img src={Logo}  alt="LOGO" height={150} width={150}/>
                    </Link>
                </div>
                <div className='callToAction'>   
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to='/dashboard'>
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => logOut()}>
                                    Logout
                                </span>
                            </li>
                        </ul>
                    )}
                    
                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to='/registration'>
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <nav>
                <div className="burgerWraper">
                    <div className={menuOpen ? "menu-btn open" : "menu-btn"} onClick={()=>burgerHandler()}>
                        <div className="menu-btn__burger">
                            
                        </div>
                    </div>
                </div>
                    <div className={menuOpen ? 'list-menu open' : 'list-menu'}>
                        {currentUser && (
                                <ul>
                                    <li>
                                        <Link to='/dashboard'>
                                            My Account
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => logOut()}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                            
                        {!currentUser && (
                            <ul>
                                <li>
                                    <Link to='/registration'>
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/login'>
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;