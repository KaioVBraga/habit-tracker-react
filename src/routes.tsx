import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={!localStorage.getItem('habit_user') ? Landing : Profile} />
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />
        </BrowserRouter>
    );
}

export default Routes;