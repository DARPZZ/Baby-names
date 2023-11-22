import React, { useState, useEffect } from 'react';
import './ProfileCSS.css';

interface UserData {
  names: {
    name: string;
    gender: string;
    isInternational: boolean;
  }[];

}

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/655dfdd41948c9d6c4343703', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

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
      <h1>List</h1>
        <ul className="list">
          {userData &&
            userData.names.map((nameData, index) => (
              <li key={index}>
                Name: {nameData.name}, Gender: {nameData.gender}, International: {nameData.isInternational ? 'Yes' : 'No'}
              </li>
            ))}
        </ul>
      </div>
      <div className='add-more'>
        <input id='ral' type="text"/>
        <button id='add-button' className='add-button'>
          Link your partner
        </button>
      </div>
    </div>
  );
}

export default Profile;
