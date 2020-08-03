import React from 'react';
import './App.css';

import Navigation from './components/presentationals/Navigation';
import PointsMap from './components/presentationals/PointsMap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NeonButton from './components/presentationals/NeonButton';
import LoginContainer from './components/containers/LoginContainer';
import RegistrationContainer from './components/containers/RegistrationContainer';

function App() {

  return (
    // <div>
    //   <PointsMap />
    //   <Navigation />

    <Router>
      <div className="App" />

      <Navigation />
      <NeonButton text="Go deeper" url="/map" />
      <Switch>
        <Route path='/map' component={PointsMap} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/register' component={RegistrationContainer} />
      </Switch>
    </Router>
  );
}

export default App;
