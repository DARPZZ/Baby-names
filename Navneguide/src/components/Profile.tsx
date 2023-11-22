import React from 'react';
import './ProfileCSS.css';
function AddToList()
{
  
}
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
      <div className="list-container">
        <ul className="list">
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>
      </div>
      <div className='add-more'>
            <input id='ral' type="text"/>
            <button id='add-button' className='add-button'>
              Link youre partner
            </button>
        </div>
    </div>
    
  );
}

export default Profile;
