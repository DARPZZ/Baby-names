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
            <Link to="/Signup">Registrering</Link>
            <br />
            <br />
            <Link to="/Login">Log på</Link>
          </>
        )}
        <div className='hest'>
        <Theme
          darkIcon='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/></svg>'
          lightIcon='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/></svg>'
          imgWidth='35'
          imgHeight='35'          
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
