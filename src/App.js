import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
// Firebase
import {auth, handleUserProfile} from './Firebase/utils';
// Layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser} from './redux/User/user.actions';
// hoc
import WithAuth from './hoc/withAuth';
// Pages
import Homepage from './Pages/HomePage';
import Registration from './Pages/Registration';
import Login  from './Pages/LoginPage';
import Recovery from './Pages/Recovery';
import Dashboard from './Pages/Dashboard';
// Styles
import './default.scss';

const App = (props) => {  
    const dispatch = useDispatch();
    
    let authListener = null
    
    useEffect(() => {
         
        return () => {
            authListener();
        }
    },[])
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' render={() => (
                    <HomePageLayout>
                        <Homepage />
                    </HomePageLayout>
                )}/>
                <Route path='/registration' render={  () => ( 
                    <MainLayout>
                        <Registration />
                    </MainLayout>
                )}/>
                <Route path='/login' 
                    render={ () => (
                    <MainLayout>
                        <Login />
                    </MainLayout>
                )}/>
                <Route
                    path='/recovery'
                    render={
                        () => (
                            <MainLayout>
                                <Recovery />
                            </MainLayout>
                        )
                    }
                />
                <Route
                    path='/dashboard'
                    render={
                        () => (
                            <WithAuth>
                                <MainLayout>
                                    <Dashboard />
                                </MainLayout>
                            </WithAuth>
                        )
                    }
                />
            </Switch>
        </div>
    )
}

export default App;