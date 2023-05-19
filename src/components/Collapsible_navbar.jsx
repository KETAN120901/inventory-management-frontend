import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from './Sidebar';
import axios from 'axios';
function Navbar() {
  const [isCollapsed1, setIsCollapsed1] = useState(false);

  const handleToggle1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };
  const [isCollapsed2, setIsCollapsed2] = useState(false);

  const handleToggle2 = () => {
    setIsCollapsed2(!isCollapsed2);
  };
  const [customersarray,setcustomersarray] = useState([]);
  useEffect(() => {
    
    axios.get("https://inventory-manager-api-h3qs.onrender.com/customers")
      .then(response => {
        setcustomersarray(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
    
  }, []);
  
  const sortedcustomers=customersarray.sort((a,b)=>b.tpro - a.tpro)
  
  
  const [itemsarray,setitemsarray] = useState([]);
  useEffect(() => {
    
    axios.get("https://inventory-manager-api-h3qs.onrender.com/")
      .then(response => {
        setitemsarray(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
    
  }, []);

  const sorteditems=[...itemsarray].sort((a,b)=>b.tpro - a.tpro)
  
  return (
   <> <div className="navbar navbar-expand-lg navbar-light bg-light">
      
        <div className='button-div'>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle1}
        >
          
        <img src="https://codeforces.org/s/45887/images/icons/icon-bars.png" className="mobile-toolbar-menu" height={"40px"} width={"40px"}/>
        
    
        </button>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle2}
        >
          
        
        <img src="https://codeforces.org/s/45887/images/icons/icons-ellipsis-v.png" class="mobile-toolbar-sidebar" height={"40px"} width={"40px"}/>
    
        </button>
        </div>
        
        <nav className={`collapse navbar-collapse ${isCollapsed1 ? '' : 'show1'}`}>
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
        
        
      </nav>
      <div className={`collapsible-sidebar collapse navbar-collapse ${isCollapsed2 ? '' : 'show2'}`}>
        <div>Pay Attention</div>
        <div>Top Rated items
        <table>
    <thead>
        <tr><td>Items</td><td>Total Buying</td><td>Total Selling</td><td>Profit</td></tr>
    </thead>
    {sorteditems.map((item) => (
        <tr>
            <td>{item.name}</td>
            <td>{item.tbuy}</td>
            <td>{item.tsell}</td>
            <td>{item.tpro}</td>
            
        </tr>
    ))}
   
  </table>
        
          
        
        </div>
        <div>Top Rated Customers
        <table>
    <thead>
        <tr><td>Customer</td><td>Total Buying</td><td>Total Selling</td><td>Profit</td></tr>
    </thead>
    {sortedcustomers.map((customer) => (
        <tr>
            <td>{customer.customerName}</td>
            <td>{customer.tbuy}</td>
            <td>{customer.tsell}</td>
            <td>{customer.tpro}</td>
            
        </tr>
    ))}
   
  </table>
        
          
        
        </div>
        <div>Find User</div>
        <div>Recent Actions</div>
    </div>
        
      
    </div>
     <div className='container'><Outlet /><Sidebar/></div>
     
     </>
  );
}

export default Navbar;
