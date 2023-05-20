import React, { useEffect,useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js';
import { Link } from "react-router-dom";

Chart.register(LinearScale);
function Transactions(){
    
    const [transactionsarray,settransactionsarray]=useState([]);
    const [profit,setprofit]=useState(0);
    useEffect(() => {
        
        axios.get('https://inventory-manager-api-h3qs.onrender.com/sell')
          .then(response => {
            settransactionsarray(response.data)
            
            
          })
          .catch(error => {
            console.log(error);
          });
        
      }, []);

      
      var tpro=0;
      var tsell=0;
      var tbuy=0;
      
      var data = {
        labels: [],
        datasets: [
          {
            label: 'Profit',
            data: [],
            fill: false,
            borderColor: 'green',
            tension: 0.1
          },
          {
            label: 'Sell',
            data: [],
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          },
          {
            label: 'Buy',
            data: [],
            fill: false,
            borderColor: 'red',
            tension: 0.1
          }
        ]
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };
     
        var array=[];
        var k=0;
        for(let i= transactionsarray.length-1;i>=0;i--){
          array[k]=transactionsarray[i];
          k++;
        }
        const [selectedOption, setSelectedOption] = useState('');
      
        const handleSelectChange = (event) => {
          
          setSelectedOption(event.target.value);
          
        };
        
        if(selectedOption=="date time both"){
          var i=0;
          transactionsarray.map((t)=>(
            
              data.datasets[0].data[i]=(t.profit-'0'),
              data.datasets[1].data[i]=(t.SellingPrice-'0')*(t.quantity-'0'),
              data.datasets[2].data[i]=(t.BuyingPrice-'0')*(t.quantity-'0'),
              data.labels[i]=t.datetime,
              tpro+=(t.profit-'0'),
        tsell+=t.SellingPrice*t.quantity,
        tbuy+=t.BuyingPrice*t.quantity,
             i++
              
            ))
        }
        else{
          var arr1=[];
          var arr21=[];
          var arr22=[];
          var arr23=[];
          var j=0;
        
         transactionsarray.map((t)=>(
            arr1[j]=t.datetime.split(' ')[0],
            arr21[j]=t.profit,
            arr22[j]=(t.SellingPrice-'0')*(t.quantity-'0'),
            arr23[j]=(t.BuyingPrice-'0')*(t.quantity-'0'),
            j++
          ))
       
          j=0;
          var arr3=[];
          var arr41=[];
          var arr42=[];
          var arr43=[];
          arr3[0]=arr1[0];
          arr41[0]=arr21[0];
          arr42[0]=arr22[0];
          arr43[0]=arr23[0];
          
    
          for (let i = 1; i < arr1.length; i++) {
            if(arr1[i]==arr1[i-1]){
              arr41[j]=(arr41[j]-'0')+(arr21[i]-'0');
              arr42[j]=(arr42[j]-'0')+(arr22[i]-'0');
              arr43[j]=(arr43[j]-'0')+(arr23[i]-'0');
            }
            else{
              j++;
              arr3[j]=arr1[i];
              arr41[j]=arr21[i];
              arr42[j]=arr22[i];
              arr43[j]=arr23[i]; 
            }
          }
          for (let i = 0; i <=j; i++) {
            
            data.datasets[1].data[i]=arr42[i];
            data.datasets[0].data[i]=arr41[i];
            data.datasets[2].data[i]=arr43[i];
            data.labels[i]=arr3[i];
          }
          
         
          array.map((t)=>(
            
          //   data.datasets[0].data[i]=(t.profit-'0'),
          //   data.datasets[1].data[i]=(t.SellingPrice-'0')*(t.quantity-'0'),
          //   data.datasets[2].data[i]=(t.BuyingPrice-'0')*(t.quantity-'0'),
            
            tpro+=(t.profit-'0'),
            tsell+=t.SellingPrice*t.quantity,
            tbuy+=t.BuyingPrice*t.quantity
            
          ))
        }
    return (<div className="transactions">
      
      <label htmlFor="mySelect">Select chart type:</label>
      <select id="mySelect" value={selectedOption} onChange={handleSelectChange}>
        <option value="">date only</option>
        <option value="date time both">date time both</option>
        
        
      </select>
      <p>Selected option: {selectedOption}</p>
   
      <Line data={data} options={options} />
      <table>
    <thead>
        <tr><td>Date/Time</td><td>Customer</td><td>Item</td><td>BuyingPrice</td><td>SellingPrice</td><td>Quantity</td><td>Profit</td></tr>
    </thead>
    {array.map((transaction) => (
        
        <tr>
            <td>{transaction.datetime}</td>
            <td><Link to={"/customers/"+transaction.customerName}>{transaction.customerName}</Link> </td>
            <td><Link to={"/items/"+transaction.itemName}>{transaction.itemName}</Link> </td>
            <td>{transaction.BuyingPrice}</td>
            <td>{transaction.SellingPrice}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.profit}</td>
        </tr>
    ))}
   
   <tr>
            <td></td>
            <td>Total buying</td>
            <td>{tbuy}</td>
            <td>Total selling</td>
            <td>{tsell}</td>
            <td>total profit</td>
            <td>{tpro}</td>
        </tr>
  </table>
        
          
        
    </div>)
}
export default Transactions;