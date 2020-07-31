import React from 'react';
import './App.css';
import PointsMap from './components/PointsMap';
import Login from './components/Login';
import { useAuth } from './auth/authProvider'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import './components/scss/navigation.scss'
import Registration from './components/Registration';

function App() {
  const [logged] = useAuth();
  return (
    // <div>
    //   <PointsMap />
    //   <Navigation />

    <Router>
      <div className="App" />
      <Navigation />
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