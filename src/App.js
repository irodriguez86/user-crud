import React, {useState} from 'react';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Header title={title}/>
              <div className="container d-flex align-items-center flex-column">
                  <Switch>
                      <Route path="/" exact={true}>
                          <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                      </Route>
                      <Route path="/register">
                          <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                      </Route>
                      <Route path="/login">
                          <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                      </Route>
                      <PrivateRoute path="/home">
                          <Home/>
                      </PrivateRoute>
                  </Switch>
                  <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
              </div>
          </div>
      </Router>
  );
}

export default App;
