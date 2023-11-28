import React, { useState, useEffect } from 'react';
import './SearchCSS.css'; // Import your CSS file

function Search() {
  const [names, setNames] = useState<string[]>([]);
  const [partnerEmail, setPartnerEmail] = useState<string | null>(null);
  const [linked, setLinked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnerEmail = sessionStorage.getItem('partnerEmail');
        const response = await fetch(`http://localhost:5000/users/email/${partnerEmail}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming data.names contains an array of names
          setNames(data.names || []);
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
    <div className="search-container">
      <div className='search-list'>
        <h1>Partners navne</h1>
        <ul className="pop-names-list">
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className='search-list2'>
        <h1>Match navne</h1>
        
        <ul className="list">
          
        </ul>
      </div>
      <form className="search-form">
        
        <div className="search-group">
          <label>Search:</label>
          <input type="text" />
          <div className="checkbox-container">
            <div className="checkbox-div">
              <label>
                <input type="checkbox" id='checkbox1' name="checkbox1" />
                Køn
              </label>
            </div>
            <div className="checkbox-div">
              <label>
                <input type="checkbox" id='checkbox2' name="checkbox2" />
                Unisex
              </label>
            </div>
            <div className="checkbox-div">
              <label>
                <input type="checkbox" id='checkbox3' name="checkbox3" />
                International
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
