import React, { useState, useEffect } from 'react';
import './SearchCSS.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
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
      
      <div className="container">
        
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="search-input">Search:</label>
            <input onChange={handleSearch} id='search-input' type="text" className="form-control mx-sm-3" />
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id='mandCheckbox' name="checkbox1" onChange={handleChange} />
            <label className="form-check-label" htmlFor="mandCheckbox">Mand</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id='kvindeCheckbox' name="checkbox1" onChange={handleChange} />
            <label className="form-check-label" htmlFor="kvindeCheckbox">Kvinde</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id='unisexCheckbox' name="checkbox1" onChange={handleChange} />
            <label className="form-check-label" htmlFor="unisexCheckbox">Unisex</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id='internationalCheckbox' name="checkbox1" onChange={handleChange} />
            <label className="form-check-label" htmlFor="internationalCheckbox">International</label>
          </div>
        </form>
        <table className="table thead-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Egne navne</th>
              <th scope="col">Match navne</th>
              <th scope="col">Partner navne</th>
            </tr>
          </thead>
          <tbody>
            {namesArray.map((name, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{namesArray[index]}</td>
                <td>{modificeeredeNavne[index]}</td>
                <td>{names[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
      </div>
    );
  }

export default Search;
