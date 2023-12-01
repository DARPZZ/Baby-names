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
    setmodificeeredeNavne(newMatchingNavne);
   
  
  }, [names, namesArray]);

  function filterNames() {
    const newMatchingNavne = names.filter(name => namesArray.includes(name));
    setmatchNavne(newMatchingNavne);
    setmodificeeredeNavne(newMatchingNavne);
  }
  
  
  let mandCheck = document.getElementById("mandCheckbox") as HTMLInputElement
  let kvindCheck = document.getElementById("kvindeCheckbox") as HTMLInputElement
  let unisexCheck = document.getElementById("unisexCheckbox") as HTMLInputElement
  let internationalCheck = document.getElementById("internationalCheckbox") as HTMLInputElement
  let apiCall ="http://localhost:5000/names/";

  let boysNames : string[] = [];
  let girlsNames : string[] = [];

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
        let newMatchNavne: string[] = [];
        data.forEach((item: any) => {
          if (matchNavne.includes(item.name)) { 
            newMatchNavne.push(item.name);
            
          }
        });
        if (firstEndPoint === "boy") {
          boysNames = [...newMatchNavne];
        } else if (firstEndPoint === "girl") {
          girlsNames = [...newMatchNavne];
        }
        if (mandCheck.checked && kvindCheck.checked) {
          setmodificeeredeNavne ([...boysNames, ...girlsNames]) ;
        }else
        {
          setmodificeeredeNavne( [...newMatchNavne]) ;
        }
        console.log(modificeeredeNavne + " modified navne")
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}



function handleChange ()
{
  let gen = "gender"
  let inter = "international"
  if(!mandCheck.checked && !kvindCheck.checked)
  {
    filterNames()
  }
  if(mandCheck.checked && kvindCheck.checked)
  {
    Promise.all([getDiffrentApi(gen,"boy"), getDiffrentApi(gen,"girl",)]).then(() => {
      setmodificeeredeNavne(boysNames.concat(girlsNames));
    });
  }
   if(kvindCheck.checked && !mandCheck.checked)
  {
    getDiffrentApi(gen,"girl");
  }
  if(mandCheck.checked && !kvindCheck.checked)
  {
    getDiffrentApi(gen,"boy");
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
