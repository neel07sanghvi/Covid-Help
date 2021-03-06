import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home from './components/Home';

function App () {
    return (
      <Router> 
          <Navigation/>
          <Switch>
            
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
        </Switch>
      </Router>
    )
}

export default App;