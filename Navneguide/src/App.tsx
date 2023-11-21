import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
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
      </nav>

      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
