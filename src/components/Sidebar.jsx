import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from "react-router-dom";
 function Sidebar(){
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
  
    return <div className='sidebar'>
        <div>Pay Attention</div>
        <div>Top Rated items
        <table>
    <thead>
        <tr><td>Items</td><td>Total Buying</td><td>Total Selling</td><td>Profit</td></tr>
    </thead>
    {sorteditems.map((item) => (
        <tr>
            <td><Link to={"/items/"+item.name}>{item.name}</Link></td>
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
            <td><Link to={"/customers/"+customer.customerName}>{customer.customerName}</Link></td>
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
        
    
 }
 export default Sidebar;