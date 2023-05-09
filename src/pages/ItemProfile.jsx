import React ,{useState,useEffect}from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom'
import './styles.css' 
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
function ItemProfile(props){

    const params = useParams()

    // search in db, search through products, 

    // console.log(params)
    const [itemsarray,setitemsarray] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setitemsarray(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
    
  }, []);
//   const [item,setItem]=useState({
//     name:"",
//     price:"",
//     quantity:""
//   });
const [transactionsarray,settransactionsarray]=useState([]);
useEffect(() => {
    
    axios.get('https://inventory-manager-api-h3qs.onrender.com/sell')
      .then(response => {
        settransactionsarray(response.data)
        
        
      })
      .catch(error => {
        console.log(error);
      });
    
  }, []);

  
  const filteredOptions = transactionsarray.filter(option => option.itemName===params.name);
  filteredOptions.reverse()

 var item={name:"",price:"",quantity:""}
  {itemsarray.filter(item => item.name.includes(params.name)).map(filteredItem => (
    item=filteredItem
  ))}
    return (<div className="itemprofile">
          
    <ul>
      <li>
        <Link to={'/items/'+params.name}>{params.name}</Link>
      </li>
      <li>
        <Link to={'/buy/'+params.name}>Buy</Link>
      </li>
      <li>
        <Link to={'/sell/'+params.name}>Sell</Link>
      </li>
      <li>
        <Link to={'/transactions/'+params.name}>Transactions</Link>
      </li>
      <li>
        <Link to={'/import/'+params.name}>Import</Link>
      </li>
      <li>
        <Link to={'/export/'+params.name}>Export</Link>
      </li>
     
      
    </ul>
    
    
 
 
  
    <h1 style={{marginTop:'20px'}}>Item-Name : {item.name}</h1>
        <h1 style={{marginTop:'20px'}}>Buying Price : {item.price}</h1>
        <h1 style={{marginTop:'20px'}}>Quantity : {item.quantity}</h1>
        <table>
          <thead>
        <tr><td>Date/Time</td><td>Customer</td><td>Item</td><td>BuyingPrice</td><td>SellingPrice</td><td>Quantity</td><td>Profit</td></tr>
    </thead>
    {filteredOptions.map((transaction) => (
        <tr>
            <td>{transaction.datetime}</td>
            <td>{transaction.customerName}</td>
            <td>{transaction.itemName}</td>
            <td>{transaction.BuyingPrice}</td>
            <td>{transaction.SellingPrice}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.profit}</td>
        </tr>
    ))}
        </table></div>)
}
export default ItemProfile;