import React, { useState, useEffect } from 'react';
import './SearchCSS.css'; 

function Search() {
 
  const [names, setNames] = useState<string[]>([]);
  const [namesArray, setNamesArray] = useState<string[]>([]);
  const [matchNavne, setmatchNavne] = useState<string[]>([]);
  const [modificeeredeNavne, setmodificeeredeNavne] = useState<string[]>([]);
 


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
    setmodificeeredeNavne(newMatchingNavne);
   
  
  }, [names, namesArray]);

  function filterNames() {
    
    const newMatchingNavne = names.filter(name => namesArray.includes(name));
    setmatchNavne(newMatchingNavne);
    setmodificeeredeNavne(newMatchingNavne);
    
    
  }
  
let mandCheck = document.getElementById("mandCheckbox") as HTMLInputElement;
let kvindCheck = document.getElementById("kvindeCheckbox") as HTMLInputElement;
let unisexCheck = document.getElementById("unisexCheckbox") as HTMLInputElement;
let internationalCheck = document.getElementById("internationalCheckbox") as HTMLInputElement;
let apiCall ="http://localhost:5000/names/";

let boysNames : Set<string> = new Set();
let girlsNames : Set<string> = new Set();
let unisexNames : Set<string> = new Set();
let internationalNames : Set<string> = new Set();

async function getDiffrentApi(mode : string, firstEndPoint : string) {
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
        let newMatchNavne: string[] = [];
        data.forEach((item: any) => {
          if (matchNavne.includes(item.name)) { 
            newMatchNavne.push(item.name);
          }
        });
        switch (firstEndPoint) {
          case "boy":
            boysNames = new Set([...newMatchNavne]);
            break;
          case "girl":
            girlsNames = new Set([...newMatchNavne]);
            break;
          case "uni":
            unisexNames = new Set([...newMatchNavne]);
            break;
            
          default:
            break;
        }
        if(mode === "international") {
          internationalNames = new Set([...newMatchNavne]);
        }
        setmodificeeredeNavne(Array.from(new Set([...boysNames, ...girlsNames, ...unisexNames,...internationalNames])));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}

let gen = "gender";
let inter = "international";

function handleChange() {
  if (!mandCheck.checked && !kvindCheck.checked && !unisexCheck.checked && !internationalCheck.checked) {
    filterNames();
  }
  const promises = [];
  if (mandCheck.checked) {
    promises.push(getDiffrentApi(gen, "boy"));
  }
  if (kvindCheck.checked) {
    promises.push(getDiffrentApi(gen, "girl"));
  }
  if (unisexCheck.checked) {
    promises.push(getDiffrentApi(gen, "uni"));
  }
  if(internationalCheck.checked) {
    promises.push(getDiffrentApi(inter,"true"));
  }
  Promise.all(promises).then(() => {
    setmodificeeredeNavne(Array.from(new Set([...boysNames, ...girlsNames, ...unisexNames,...internationalNames])));
    filterNames();
  });
}


   
    function handleSearch() {
      let inputElement = document.getElementById("search-input") as HTMLInputElement;
      let inputVærdi = inputElement.value;
      if (modificeeredeNavne.includes(inputVærdi)) {
       
        setmodificeeredeNavne([inputVærdi]);
      }else if (inputVærdi === ""){
        handleChange();
      } 
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
                {modificeeredeNavne.map((name, index) => (
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
          <input onChange={handleSearch} id='search-input' type="text" />
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
