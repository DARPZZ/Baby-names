import React, { useState, useEffect } from 'react';
import './ProfileCSS.css';

function Profile() {
  const [names, setNames] = useState<string[] | null>(null);
  const [partnerEmail, setPartnerEmail] = useState<string | null>(null);
  const [linked, setLinked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('submittedEmail');
       
        const response = await fetch(`http://localhost:5000/users/email/${email}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNames(data.names);
          setPartnerEmail(data.partner);

          // If partner email exists, store it in session storage
          if (data.partner) {
            sessionStorage.setItem('partnerEmail', data.partner);
          }
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddPartner = async () => {
    try {
      const email = localStorage.getItem('submittedEmail');
      const partnerEmailElement = document.getElementById('ral') as HTMLInputElement | null;

      let partnerEmail: string = '';
      
      if (partnerEmailElement !== null) {
        partnerEmail = partnerEmailElement.value;
      } else {
        console.log("Fejl i link")
      }
      const response = await fetch(`http://localhost:5000/users/partner/${email}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: partnerEmail }),
      });

      if (response.ok) {
        console.log('Partner linked successfully');
        setPartnerEmail(partnerEmail); 
        setLinked(true); // fyre css event
        
        sessionStorage.setItem('partnerEmail', partnerEmail); // Store in session storage

        // sletter css event efter 2 sec
        setTimeout(() => {
          setLinked(false);
        }, 2000);
      } else {
        console.error('Failed to link partner');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
        
        <button className="submit-button">Save</button>  
      </form>

      <div className="list-container">
        <h1>List of Names</h1>
        {names && (
          <ul className="list">
            {names.map((name, index) => (
              <li key={index}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='add-more'>
        <input
          id='ral'
          type="text"
          defaultValue={partnerEmail || ''}
          className={linked ? 'linked-partner' : ''}
        />
        <button id='add-button' className='add-button' onClick={handleAddPartner}>
          Link your partner
        </button>
      </div>
    </div>
  );
}

export default Profile;
