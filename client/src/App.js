import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Feed from './components/Feed';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Filter from './components/Filter';
import Profile from './components/Profile';
import AddPost from './components/AddPost';
import Home from './components/Home';

function App () {
    return (
        <Router> 
            <Navigation/>
            <Switch>
              <Route exact path="/">
                
                <Home></Home>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
          </Switch>
        </Router>
    )
}

export default App;