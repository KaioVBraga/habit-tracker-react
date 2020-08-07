import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Goal from './pages/Goal';
import Habit from './pages/Habit';

const App = () => {
  return (
    <Router>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/goal"  component={Goal} />
      <Route path="/habit"  component={Habit} />
    </Router>
  );
}

export default App;