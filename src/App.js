import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import User from './pages/User';
import Goal from './pages/Goal';
import Habit from './pages/Habit';

const App = () => {
  return (
    <Router>
      <Route path="/user" component={User} />
      <Route path="/goal"  component={Goal} />
      <Route path="/habit"  component={Habit} />
    </Router>
  );
}

export default App;