import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
//   Material UI
import {Button} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//   Components
// import {Home} from '../components/Home';
// import {ImageList} from '../components/AllFlawers/ImageList';

// styles
import {makeStyles} from '@material-ui/core/styles';
import {brown} from '@material-ui/core/colors';
import './routes.scss';

const useStyles = makeStyles(theme => ({
    link: {
        color: brown[100]
    },
    linkA: {
        textDecoration: 'none',
        fontSize: 20
    },
    btnM:{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontSize: '40px'
    }
}));
const Routs = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Router>
                <Button className={classes.link, classes.btnM} color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    MENU
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link className={classes.linkA} to="/">На головну</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link className={classes.linkA} to="/all-list">Всі квіти</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link className={classes.linkA} to="/contacts">Контакти</Link>
                    </MenuItem>
                </Menu>
                        {/* <ul>
                            <li>
                                <Button color="secondary">
                                    <Link to="/">На головну</Link>
                                </Button>
                            </li>
                            <li>
                                <Button color="secondary">
                                    <Link to="/all-list">Всі квіти</Link>
                                </Button>
                            </li>
                            <li>
                                <Button color="secondary">
                                    <Link to="/contacts">Контакти</Link>
                                </Button>
                            </li>
                        </ul> */}
                <Switch>
                    <Route path="/all-list">
                        {/* <ImageList/> */}
                    </Route>
                    <Route path="/contacts">
                        {/* <Contacts /> */}
                    </Route>
                    <Route path="/">
                        {/* <Home /> */}
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Routs;