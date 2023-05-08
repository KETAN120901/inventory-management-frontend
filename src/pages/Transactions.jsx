import React, { useEffect,useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

function Transactions(){
  
    const [transactionsarray,settransactionsarray]=useState([]);
    const [profi,setprofit]=useState(0);
    useEffect(() => {
        
        axios.get('http://localhost:5000/sell')
          .then(response => {
            settransactionsarray(response.data)
            
            
          })
          .catch(error => {
            console.log(error);
          });
        
      }, []);
      var pro=0;
      transactionsarray.reverse();
      transactionsarray.map((t)=>(
        pro+=(t.profit-'0')
      ))
      
    return (<div className="transactions">
      <table>
    <thead>
        <tr><td>Date/Time</td><td>Customer</td><td>Item</td><td>BuyingPrice</td><td>SellingPrice</td><td>Quantity</td><td>Profit</td></tr>
    </thead>
    {transactionsarray.map((transaction) => (
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
   <tr><td></td><td></td><td></td><td></td><td></td><td>Total Profit</td><td>{pro}</td></tr>
  </table>
        
          
        
    </div>)
}
export default Transactions;