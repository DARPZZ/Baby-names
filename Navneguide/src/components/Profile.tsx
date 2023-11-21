import React from 'react';
import './ProfileCSS.css';

function Profile() {
  return ( 
    <div className="profile-container">
      <form className="profile-form">
        <div className="profile-group">
          <label htmlFor="UserName">Username:</label>
          <input type="text" id="UserName" name="UserName" />
        </div>
        <div className="profile-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
        </div>
        <button className="submit-button">
          Save
        </button>
      </form>
        <div className='add-more'>
            <input type="text"/>
        </div>
      <div className="list-container">
        
        <ul className="list">
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
          
        </ul>
      </div>
    </div>
  );
}

export default Profile;