import React,{useEffect,useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom'
import './styles.css' 
import {outlet,Link} from 'react-router-dom';
import axios from "axios";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js';

Chart.register(LinearScale);

// use the linear scale in your chart options and data

function CustomerProfile(props){

    const params = useParams()

    // search in db, search through products, 
    const [itemsarray,setitemsarray] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:5000/customers')
        .then(response => {
          setitemsarray(response.data);
          
        })
        .catch(error => {
          console.log(error);
        });
      
    }, []);
    // console.log(params)
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

      transactionsarray.reverse();
      const filteredOptions = transactionsarray.filter(option => option.customerName===params.name);
    var customer={customerName:"",fathername:"",village:""}
  {itemsarray.filter(item => item.customerName.includes(params.name)).map(filteredItem => (
    customer=filteredItem
  ))}
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
      var i=0;
      filteredOptions.map((t)=>(
        data.datasets[0].data[i]=(t.profit-'0'),
        data.datasets[1].data[i]=(t.SellingPrice-'0')*(t.quantity-'0'),
        data.datasets[2].data[i]=(t.BuyingPrice-'0')*(t.quantity-'0'),
        data.labels[i]=t.datetime,
        tpro+=(t.profit-'0'),
        tsell+=t.SellingPrice*t.quantity,
        tbuy+=t.BuyingPrice*t.quantity,
        i++
      ))
    return (<div className="customerprofile">
        <ul>
      <li>
        <Link to={'/customers/'+params.name}>{params.name}</Link>
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
    
    
 
 
        
        <h1 style={{marginTop:'20px'}}>Item-Name : {params.name}</h1>
        <h1 style={{marginTop:'20px'}}>Father-Name : {customer.fatherName}</h1>
        <h1 style={{marginTop:'20px'}}>Village : {customer.village}</h1>
        <Line data={data} options={options} />

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
        </div>
        )

}
export default CustomerProfile;