import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';
import Profile from './components/Profile';
import PopularNames from './components/PopularNames';
import Logud from './components/Logud';
import './App.css';

function App() {
  const [menuVisible, setMenuVisible] = useState(true); 
  const [loggedIn, setLoggedIn] = useState(false);

  
  useEffect(() => {
    const status = sessionStorage.getItem('loggedIn');
    setLoggedIn(status === 'true');
  }, []);

  return (
    <div className="App">
      <nav className={`menu ${menuVisible ? 'show' : ''}`}>
      <Link to="/">Home</Link>
      <br />
      <br />
      <Link to="/PopularNames">PopularNames</Link>
      <br />
      <br />
        {loggedIn ? (
          <>
            <Link to="/Profile">Profile</Link>
            <br />
            <br />
            <Link to="/Search">Search</Link>
            <br />
            <br />
            <Link to="/Logud">Logud</Link>
          </>
        ) : (
          <>
            <Link to="/Signup">Signup</Link>
            <br />
            <br />
            <Link to="/Login">Login</Link>
          </>
        )}
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Login" component={Login} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Search" component={Search} />
        <Route path="/PopularNames" component={PopularNames} />
        <Route path="/Logud" component={Logud} />
      </Switch>
    </div>
  );
}

export default App;
