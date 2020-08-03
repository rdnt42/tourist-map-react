import React from 'react';
import './App.css';

import Navigation from './components/Navigation';
import PointsMap from './components/PointsMap';
import Login from './components/Login'
import Registration from './components/Registration';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NeonButton from './components/NeonButton';

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
        <Route path='/login' component={Login} />
        <Route path='/register' component={Registration} />
      </Switch>
    </Router>
  );
}

export default App;


{/* <Route path='/' component={PointsMap} />
        {!logged && <>
          <Route path='/login' component={Login} />
          <Redirect to="/login" />
        </>}
        {logged && <>
          <Route path='/map' component={PointsMap} />
          <Redirect to="/map" />
        </>} */}