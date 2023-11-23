import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';
import Profile from './components/Profile';
import PopularNames from './components/PopularNames';
import './App.css';

function App() {
  const [menuVisible, setMenuVisible] = useState(true); // Set to true by default

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="App">
      

      <nav className={`menu ${menuVisible ? 'show' : ''}`}>
        <Link to="/home" >
          Home
        </Link>
        <br />
        <br />
        <Link to="/Signup" >
          Signup
        </Link>
        <br />
        <br />
        <Link to="/Login">
          Login
        </Link>
        <br />
        <br />
        <Link to="/Profile">
          Profile
        </Link>
        <br />
        <br />
        <Link to="/Search">
          Search
        </Link>
        <br />
        <br />
        <Link to="/PopularNames">
          PopularNames
        </Link>
      </nav>

      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Login" component={Login} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Search" component={Search} />
        <Route path="/PopularNames" component={PopularNames} />
        
      </Switch>
    </div>
  );
}

export default App;
