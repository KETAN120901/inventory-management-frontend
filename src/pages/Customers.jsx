// require('dotenv').config();

import React , { useEffect,useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Customer from "../components/Customer"
import axios from "axios";
import SearchCustomer from "../components/SearchCustomer";
function Customers(){
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
    function createcustomer(customer,index){
        return <Customer key={index} id={index} onDelete={deleteCustomer} customerName={customer.customerName} fatherName={customer.fatherName} village={customer.village}/>
    }
    function deleteCustomer(id){
        setcustomersarray(previtems => {
            return previtems.filter((arrayitem,index) => {
                return index !== id;
            })
        })
    }
  const [customer,setcustomer]=useState({
    id: "",
    customerName:"",
    fatherName:"",
    village:""
  })
  
  function handleChange(event){
    const {name,value}=event.target
    setcustomer(prevcustomer => {
        
        return { ...prevcustomer,[name]:value};
    })
  }
  function handleClick(event){
    axios.post('https://inventory-manager-api-h3qs.onrender.com/customers', customer)
  .then(response => {
    //console.log('Response from server:', response.data);
  })
  .catch(error => {
    console.error('Error sending POST request:', error);
  });
  return;
  }
  customersarray.reverse();
    return (<div className="home-section"><div>
    <form className='item-form' action="/customers">
      <input type="text" placeholder='Customer-name' name='customerName' value={customer.customerName} onChange={handleChange}/>
      <input type="text" placeholder='Father-name' name='fatherName' value={customer.fatherName} onChange={handleChange}/>
      <input type="text" placeholder='village'name='village' value={customer.village} onChange={handleChange}/>
      <button onClick={handleClick}>Add</button>
    </form>
  </div>
  {/* {console.log(customersarray[0].customerName)} */}
  <SearchCustomer data={customersarray}/>
  {/* {customersarray.map(createcustomer)} */}
    </div>)
}
export default Customers;