import './SearchCSS.css';
function Search() {
    return(
       <div className="search-container">
            <form className="search-form">
            <div className="search-group">
          <label>Search:</label>
          <input type="text" id="UserName" name="UserName" />
          <label className="form-control">
          <input type="checkbox" id='checkbox' name="checkbox" />
          Køn
        </label>
       
        <label className="form-control">
          <input type="checkbox" id='checkbox' name="checkbox" />
          Unisex
        </label>
        <label className="form-control">
          <input type="checkbox" id='checkbox' name="checkbox" />
          International
        </label>

        </div>
            </form>
       </div>
    )

  }
  
  export default Search