import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './styles.css'
 function Sidebar(){
    const [customersarray,setcustomersarray] = useState([]);
  useEffect(() => {
    
    axios.get("http://localhost:5000/customers")
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
    
    axios.get("http://localhost:5000/")
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
        
    
 }
 export default Sidebar;