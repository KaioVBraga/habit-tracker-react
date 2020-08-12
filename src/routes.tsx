import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/signin" component={Login}/>
            <Route path="/signup" component={Register}/>
        </BrowserRouter>
    );
}

export default Routes;