import React, {  useState, useEffect } from 'react';
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

  async function  test() {
    const email = sessionStorage.getItem('submittedEmail');
       
  const response = await fetch(`http://localhost:5000/users/email/${email}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    setNamesArray(data.names);
    
    if (data.partner) {
      sessionStorage.setItem('partnerEmail', data.partner);
    }
  }
  }
useEffect(() => {
  
   test();
    
  }, []);
  
 
 
  // useEffect(() => {
  //   const storedNamesArray = sessionStorage.getItem('namesArray');
  //   const parsedNamesArray = storedNamesArray ? JSON.parse(storedNamesArray) : [];
  //   setNamesArray(parsedNamesArray);
  // }, []);


  


  

  function filterNames() {
    
    const newMatchingNavne = names.filter(name => namesArray.includes(name));
    setmatchNavne(newMatchingNavne);
    setmodificeeredeNavne(newMatchingNavne);  
  }
  useEffect(() => {
    if (names.length > 0 && namesArray.length > 0) {
      const newMatchingNavne = names.filter(name => namesArray.includes(name));
      setmatchNavne(newMatchingNavne);
      setmodificeeredeNavne(newMatchingNavne);
      if (sessionStorage.getItem('uploadCalled') === null) {
        uploadMatches(newMatchingNavne);
        sessionStorage.setItem('uploadCalled', 'true');
      }
    }
  }, [names, namesArray]);
  
  
  
  
  async function uploadMatches(matchNavne: string[]) {
    for (let i = 0; i < matchNavne.length; i++) {
      try {
        const response = await fetch(`http://localhost:5000/matches`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: matchNavne[i], 
            date: new Date() 
          }),
        });
  
        if (response.ok) {
          console.log("all good");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
          <label htmlFor="search-input">Søg:</label>
          <input 
            onChange={handleSearch} 
            id='search-input' 
            type="text" 
            className="form-control mx-sm-3" 
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right'
            }}
          />
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
                <td>{modificeeredeNavne[index]} {modificeeredeNavne[index] && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A23.825 23.825 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a8.827 8.827 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
                </svg>}</td>
                <td>{names[index]}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }

export default Search;
