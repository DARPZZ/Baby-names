import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';
import Profile from './components/Profile';
import PopularNames from './components/PopularNames';
import Logud from './components/Logud';
import {Theme} from "dark-mode-ts";
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
      <Link to="/">Hjem</Link>
      <br />
      <br />
      <Link to="/PopularNames">Populære navne</Link>
      <br />
      <br />
        {loggedIn ? (
          <>
            <Link to="/Profile">Profile</Link>
            <br />
            <br />
            <Link to="/Search">Søg</Link>
            <br />
            <br />
            <Link to="/Logud">Logud</Link>
          </>
        ) : (
          <>
            <Link to="/Signup">registrering</Link>
            <br />
            <br />
            <Link to="/Login">Log på</Link>
          </>
        )}
        <div className='hest'>
      <Theme
        darkIcon={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZWrpO9Sq1oA8FsBRuTQSg6dUFkyUG3ZAfQ&usqp=CAU"}
        lightIcon={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGfeJ2uD4VIKIaiTk0omEMafgGFPOT6B07Qw&usqp=CAU"}
        altDark='dark icon'
        altLight="light icon"
        imgWidth='50'
        imgHeight='50'
        myClass="your-class_name"
      />
      </div>
  
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
