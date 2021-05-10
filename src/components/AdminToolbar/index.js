import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {checkUserIsAdmin} from '../../utils';
import './styles.scss';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const AdminToolBar = props => {
    const {currentUser} = useSelector(mapState);
    //  use helper function for checking is this user are admin
    const isAdmin = checkUserIsAdmin(currentUser);
    // if this currentUser is not admin return nothing
    if (!isAdmin) return null; 
    // if this currentUser is admin he will see this component
    return (
        <div className="adminToolBar">
            <ul>
                <li>
                    <Link to="/admin">
                        My Admin
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AdminToolBar;
