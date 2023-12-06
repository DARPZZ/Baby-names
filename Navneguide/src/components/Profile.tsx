import React, { useState, useEffect } from 'react';
import './ProfileCSS.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [names, setNames] = useState<string[] | null>(null);
  const [partnerEmail, setPartnerEmail] = useState<string | null>(null);
  const [linked, setLinked] = useState<boolean>(false);
  const [allNames, setAllNames] = useState<string[]>([]);
  const namesList = document.querySelectorAll('.list-container .list li');
  const namesArray = Array.from(namesList).map(li => li.textContent);
  sessionStorage.setItem('namesArray', JSON.stringify(namesArray));

  async function getNamesByEmail()
    {
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
    useEffect(() => {
      getNamesByEmail();
    }, []);
  interface NameObject {
    name: string;
  
  }
  async function fetchDataAndSetNames() {
    try {
      const response = await fetch(`http://localhost:5000/names/all`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data: NameObject[] = await response.json();
        const namesArray = data.map(item => item.name);
        setAllNames(namesArray);
        console.log(allNames);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Fetch data when the page loads
  useEffect(() => {
    fetchDataAndSetNames();
  }, []);
  
  
  async function addToOwnList( name : string) {
    const email = localStorage.getItem('submittedEmail');
  
    try {
      const response = await fetch(`http://localhost:5000/users/names/${email}`, {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
  
      if (response.ok) {
        
        console.log('Name added successfully');
        getNamesByEmail();
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


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
        body: JSON.stringify({ email: partnerEmail }),
      });

      if (response.ok) {
        console.log('Partner linked successfully');
        setPartnerEmail(partnerEmail); 
        setLinked(true); // fyre css event
        sessionStorage.setItem('partnerEmail', partnerEmail); // Store in session storage
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

    function handleSearch() {
      let inputElement = document.getElementById("seach-input") as HTMLInputElement;
      var inputVærdi = inputElement.value;
      if (allNames.includes(inputVærdi)) {
        setAllNames([inputVærdi]);
      }else if (inputVærdi === ""){
       fetchDataAndSetNames();
      } 
    }   
 

  return (
    <div className="profile-container">
      <form className="profile-form">
        <div className="profile-group">
          <label htmlFor="UserName">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="profile-group">
          <label htmlFor="email">Adgangskode:</label>
          <input type="password" id="email" name="email" />
        </div>
        <button id='submit-button'>Gem</button>  
      </form>

    <div className='add-to-list'>
          <div className="container">
        <br/>
          <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                  <form className="card card-sm">
                      <div className="card-body row no-gutters align-items-center">
                          <div className="col-auto">
                              <i className="fas fa-search h4 text-body"></i>
                          </div>
                          <div className="col">
                            
                              <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Søg efter navne" onChange={handleSearch} id='seach-input'></input>
                          </div>
                          
                      </div>
                  </form>
              </div>
          </div>
        </div>
      </div>

      <div className="list-container2">
  <h3>Liste over alle navne</h3>
  {allNames && (
    <ul className="list list-group">
      {allNames.map((name, index) => (
        <li key={index} className="list-group-item" onDoubleClick={() => addToOwnList(name)}>
          {name}
        </li>
      ))}
    </ul>
  )}
</div>
<div className="list-container">
  <h3>Liste over egne navne</h3>
  {names && (
    <ul className="list list-group">
      {names.map((name, index) => (
        <li key={index} className="list-group-item">
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
          Link din partner
        </button>
      </div>
    </div>
  );
}

export default Profile;
