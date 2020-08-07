import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignUp from './pages/SignUp';
import Goal from './pages/Goal';
import Habit from './pages/Habit';

const App = () => {
  return (
    <Router>
      <Route path="/signup" component={SignUp} />
      <Route path="/goal"  component={Goal} />
      <Route path="/habit"  component={Habit} />
    </Router>
  );
}

export default App;