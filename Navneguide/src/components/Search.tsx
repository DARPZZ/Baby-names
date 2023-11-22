import './SearchCSS.css';
function Search() {
    return(
       <div className="search-container">
            <form className="search-form">
            <div className="search-group">
          <label>Search:</label>
          <input type="text" id="UserName" name="UserName" />
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