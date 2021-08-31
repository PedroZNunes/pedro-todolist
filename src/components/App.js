import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './Main'
import Signup from './account/Signup'
import Login from './account/Login'

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './account/ForgotPassword.js';
import UpdateUser from './account/UpdateUser';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/" component={Main} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/update-user" component={UpdateUser} />
                    <Route path="/forgot-password" component={ForgotPassword} />

                </Switch>
            </AuthProvider>
        </Router>
    )
}
