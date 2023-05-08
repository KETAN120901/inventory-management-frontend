import React , {useEffect,useState} from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
function Nav(){
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Load options from API when component mounts
    axios.get('http://localhost:5000/')
      .then(response => {
        setOptions(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredOptions = options.filter(option => option.name.toLowerCase().startsWith(inputValue));
    setInputValue(inputValue);
    setFilteredOptions(filteredOptions);
  }

  const handleOptionClick = (option) => {
    setInputValue(option.name);
    setFilteredOptions([]);
  }
    return <><div className="noncollapse-navbar"><nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sell">Sell</Link>
      </li>
      <li>
        <Link to="/catalog">Catalog</Link>
      </li>
      <li>
        <Link to="/transactions">Transactions</Link>
      </li>
      <li>
        <Link to="/import">Import</Link>
      </li>
      <li>
        <Link to="/export">Export</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
      
    </ul>
    
    <div>
      <input type="text" value={inputValue} onInput={handleInputChange} />
      <ul style={{display:"block",borderRadius:"5px",position:'absolute',backgroundColor:'black',color:'white',height:'200px',overflowY:'auto'}}>
        {filteredOptions.map(option => (
          <li style={{padding:'7px'}} key={option} onClick={() => handleOptionClick(option)}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>

    
  </nav>
 
  </div>
   
   </>
}
export default Nav;