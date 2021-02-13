import './App.css';
import React from 'react';
import Form from './components/Form';
import Login from './Views/Login'
import {AuthProvider} from './contexts/AuthContext';
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
import {ApolloProvider} from '@apollo/client';
import {client} from './contexts/ApolloCient';
import NavBar from './Nav';
import Footer from './components/Footer'
import { Grommet} from 'grommet';
import MainSidebar from './UI/MainSidebar'


function App() {  
  return (
  <Grommet>
    
    <div className="App">
      <Router>
      <NavBar/>
      {/* <MainSidebar/> */}
  <ApolloProvider client={client}>
  <AuthProvider>
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
          <Route path="*"  component={NotFoundPage}/>
        </Switch>
      </GlobalProvider>
    </AuthProvider>
  </ApolloProvider>    
      </Router>
      <Footer />
    </div>
  </Grommet>
  );
}

export default App;
