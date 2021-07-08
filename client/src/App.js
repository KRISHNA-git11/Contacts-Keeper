import React,{Fragment} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import PrivateRoute from './components/routing/PrivateRoute';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
                <Navbar />
                <Alerts />
                <div className="container">
                    <Switch>
                      <PrivateRoute exact path="/" component={Home} />
                      <Route exact path="/about" component={About} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/login' component={Login} />
                    </Switch>
                </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
