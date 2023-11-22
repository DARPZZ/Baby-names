import './SearchCSS.css';
function Search() {
    return(
       <div className="search-container">
         <div className='search-list'>
         <ul className="list">
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
          
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
    )

  }
  
  export default Search