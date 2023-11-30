import React, { useState, useEffect } from 'react';
import './SearchCSS.css'; 

function Search() {
  const [names, setNames] = useState<string[]>([]);
  const [namesArray, setNamesArray] = useState<string[]>([]);
  const [matchNavne, setmatchNavne] = useState<string[]>([]);

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

 
  useEffect(() => {
    const storedNamesArray = sessionStorage.getItem('namesArray');
    const parsedNamesArray = storedNamesArray ? JSON.parse(storedNamesArray) : [];
    setNamesArray(parsedNamesArray);
  }, []);


  useEffect(() => {
  
    const newMatchingNavne = names.filter(name => namesArray.includes(name));
    setmatchNavne(newMatchingNavne);
  }, [names, namesArray]);

  return (
    <div className="search-container">
      <div className='search-list3'>
        <table className="search-list3">
          
          <tbody>
          <tr>
             <td>
             <h5>Egne navne</h5>
                <ul className="list">
                  {namesArray.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <h5>Match navne</h5>
                <ul className="list">
                {matchNavne.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </td>
              <td>
              <h5>Partner navne</h5>
                <ul className="pop-names-list">
                  {names.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </td>
            </tr> 
          </tbody>
        </table>
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
