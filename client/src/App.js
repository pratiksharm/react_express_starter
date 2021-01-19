import './App.css';
import React from 'react';
import Form from './components/Form';
import Login from './Views/Login'
import {AuthContext} from './contexts/AuthContext';
import { GlobalProvider } from './contexts/globalcontext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Timeline from './Views/Timeline';
import Analysis from './Views/Analysis';
import WriteOn from './Views/WriteOn';
import Dashboard from './Views/Dashboard';
function App() {
  return (
    <div className="App">
      <Router>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/timeline">Timeline</Link>
            </li>
            <li>
              <Link to="/analysis">Analysis</Link>
            </li>
            <li>
              <Link to="/form">form</Link>
            </li>
            <li>
              <Link to="/writeon">writeOn</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
  <AuthContext.Provider>
    <GlobalProvider>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/timeline">
            <Timeline/>
          </Route>
          <Route path="/analysis">
            <Analysis/>
          </Route>
          <Route path="/writeon">
            <WriteOn/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          
        </Switch>
      </GlobalProvider>
    </AuthContext.Provider>
      
      </Router>
    </div>
  );
}

export default App;
