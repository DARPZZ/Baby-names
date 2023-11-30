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
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/names/all`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          //console.log(data)
          
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
 
  
  
  let mandCheck = document.getElementById("mandCheckbox") as HTMLInputElement
  let kvindCheck = document.getElementById("kvindeCheckbox") as HTMLInputElement
  let unisexCheck = document.getElementById("unisexCheckbox") as HTMLInputElement
  let internationalCheck = document.getElementById("internationalCheckbox") as HTMLInputElement
  let apiCall ="http://localhost:5000/names/";

  function getDiffrentApi(mode : string, firstEndPoint : string)
  {
    

    const fetchData = async () => {
      try {
        
        const response = await fetch(`${apiCall}${mode}/${firstEndPoint}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          let newMatchNavne = [...matchNavne]; // Create a copy of the current state
          data.forEach((item: any) => {
            if (newMatchNavne.includes(item.name)) {
              // Push the new name into the new array
              newMatchNavne.push(item.name);
              console.log(item.name);
            }
          });
          setmatchNavne(newMatchNavne); // Update the state
          
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    setmatchNavne([]);
    fetchData();      
  }
  function remove()
  {
    
  }


  function handleChange ()
  {
   let gen = "gender"
   let inter = "international"
 
 
    if(mandCheck.checked)
    {
      
      getDiffrentApi(gen,"boy");
      
      
    }
     if(kvindCheck.checked)
    {
      getDiffrentApi(gen,"girl");
    }


    
    //  if(unisexCheck.checked)
    // {
    //   getDiffrentApi(gen,"uni");
    // }
    // if(internationalCheck.checked)
    // {
    //   getDiffrentApi(inter,"true");
    // }

    
  }
 
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
                <input type="checkbox" id='mandCheckbox' name="checkbox1" onChange={handleChange} />
                Mand
              </label>
            </div>
            <div className="checkbox-div">
              <label>
                <input type="checkbox" id='kvindeCheckbox' name="checkbox1" onChange={handleChange} />
                Kvinde
              </label>
            </div>
            <div className="checkbox-div">
              <label>
                <input type="checkbox" id='unisexCheckbox' name="checkbox1" onChange={handleChange} />
                Unisex
              </label>
            </div>
            <div className="checkbox-div">
              <label>
                <input type="checkbox" id='internationalCheckbox' name="checkbox1"onChange={handleChange} />
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
