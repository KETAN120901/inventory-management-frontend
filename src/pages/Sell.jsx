import React, { useEffect,useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Item from "../components/Item";
import axios from 'axios';
import SearchItem from '../components/SearchItem';

function Sell() {
  
  

  const [itemsarray,setitemsarray] = useState([]);
  const [customersarray,setcustomersarray] = useState([]);
  
  useEffect(() => {
    axios.get('https://inventory-manager-api-h3qs.onrender.com/')
      .then(response => {
        setitemsarray(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
      function handleevent(){
        setFilteredItems([]);
        setFilteredCustomers([]);
      }
     document.addEventListener('click',handleevent);
  }, []);
  
  useEffect(() => {
  axios.get('https://inventory-manager-api-h3qs.onrender.com/customers')
  .then(response => {
    setcustomersarray(response.data);
    
  })
  .catch(error => {
    console.log(error);
  });
}, []);

  const [filteredItems,setFilteredItems] = useState(itemsarray);
  const [filteredCustomers, setFilteredCustomers] = useState(customersarray);
    function createitem(item,index){
        return <Item key={index} id={index} onDelete={deleteItem} name={item.name} quantity={item.quantity} price={item.price}/>
    }
    function deleteItem(id){
        setitemsarray(previtems => {
            return previtems.filter((arrayitem,index) => {
                return index !== id;
            })
        })
    }
  const [item,setitem]=useState({
    id: "",
    customerName:"",
    itemName:"",
    BuyingPrice:"",
    SellingPrice:"",
    quantity:"",
    datetime:"",
    profit:"",
  })
  
  function handleChange(event){
    const {name,value}=event.target
    setitem(previtem => {
        
        return { ...previtem,[name]:value};
    })
  }
  function handleChange1(event){
    const {name,value}=event.target
    
    const inputValue = event.target.value;
    const filteredOptions = customersarray.filter(option => option.customerName.startsWith(inputValue));
    setitem(previtem => {
        
        return { ...previtem,[name]:value};
    })
    setFilteredCustomers(filteredOptions);
  }
  function handleChange2(event){

    const {name,value}=event.target
    
    const inputValue = event.target.value;
    const filteredOptions = itemsarray.filter(option => option.name.startsWith(inputValue));
    setitem(previtem => {
        
        return { ...previtem,[name]:value};
    })
    setFilteredItems(filteredOptions);
  }
  const[array1,setarray1]=useState([]);
  const[array2,setarray2]=useState([]);
  function handleClick(event){
   
    
    const option = itemsarray.filter(item1=>(item1.name===item.itemName))
    
    const date=new Date();
    const formattedDate = date.toLocaleDateString(); // Output: '5/8/2023'
    const formattedTime = date.toLocaleTimeString(); // Output: '10:30:00 AM'
    item.datetime=formattedDate+" "+formattedTime
    item.BuyingPrice=option[0].price;
    
    item.profit=(item.quantity)*(item.SellingPrice-item.BuyingPrice);
    axios.post('https://inventory-manager-api-h3qs.onrender.com/sell', item)
  .then(response => {
    console.log('Response from server:', response.data);
    
  })
  .catch(error => {
    console.error('Error sending POST request:', error);
  });
  const filteredItem = itemsarray.filter(option => option.name===item.itemName);
  const path1='/'+filteredItem[0]._id;
  
  console.log(path1);
  var item1={};
  item1.name=filteredItem[0].name;
  item1.price=filteredItem[0].price;
  item1.quantity=filteredItem[0].quantity-item.quantity;
  item1.tbuy=filteredItem[0].tbuy;
  item1.tsell=(filteredItem[0].tsell-'0')+(item.SellingPrice-'0')*(item.quantity-'0')
  item1.tpro=(filteredItem[0].tpro-'0')+(item.SellingPrice-'0')*(item.quantity-'0')-filteredItem[0].price*(item.quantity-'0')
  
  

  axios.put('https://inventory-manager-api-h3qs.onrender.com/',item1).
  then(response => {
    console.log(response.data)
    
  })
  .catch(error => {
    console.log(error);
  });
  const filteredCustomer = customersarray.filter(option => option.customerName===item.customerName);
  var customer1={};
  customer1.customerName=filteredCustomer[0].customerName;
  customer1.fatherName=filteredCustomer[0].fatherName;
  customer1.village=filteredCustomer[0].village;
  customer1.tbuy=(filteredCustomer[0].tbuy-'0')+(item.quantity-'0')*(filteredItem[0].price-'0');
  customer1.tsell=(filteredCustomer[0].tsell-'0')+(item.SellingPrice-'0')*(item.quantity-'0')
  customer1.tpro=(filteredCustomer[0].tpro-'0')+(item.SellingPrice-'0')*(item.quantity-'0')-(item.quantity-'0')*(filteredItem[0].price-'0');
  
  

  axios.put('https://inventory-manager-api-h3qs.onrender.com/updatecustomer',customer1).
  then(response => {
    console.log(response.data)
    
  })
  .catch(error => {
    console.log(error);
  });
  

  }
 
  const handleOptionClick1 = (option) => {
    setitem(previtem => {
        
        return { ...previtem,["customerName"]:option.customerName};
    })
    setFilteredCustomers([]);
  }
  const handleOptionClick2 = (option) => {
  
    setitem(previtem => {
        
        return { ...previtem,["itemName"]:option.name};
    })
    setFilteredItems([]);
  }
  
  return (
    <section className='home-section'>
    
    <div>
      <form className='item-form'>
        <input type="text" autoComplete="off" placeholder='Customer-name' name='customerName' value={item.customerName} onInput={handleChange1}/>
        <ul style={{display:"block",borderRadius:"5px",position:'absolute',top:'240px',backgroundColor:'black',color:'white',height:'200px',overflowY:'auto'}}>
        {filteredCustomers.map(option => (
          <li style={{padding:'7px'}} key={option} onClick={() => handleOptionClick1(option)}>
            {option.customerName}
          </li>
        ))}
      </ul>
        <input type="text" autoComplete="off" placeholder='Item-name' name='itemName' value={item.itemName} onInput={handleChange2}/>
        <ul style={{display:"block",borderRadius:"5px",position:'absolute',top:'300px',backgroundColor:'black',color:'white',height:'200px',overflowY:'auto'}}>
        {filteredItems.map(option => (
          <li style={{padding:'7px'}} key={option} onClick={() => handleOptionClick2(option)}>
            {option.name}
          </li>
        ))}
      </ul>
        <input type="text" autoComplete="off" placeholder='Selling-Price' name='SellingPrice' value={item.SellingPrice} onChange={handleChange}/>
        <input type="text" autoComplete="off" placeholder='quantity'name='quantity' value={item.quantity} onChange={handleChange}/>
        <button onClick={handleClick}>Sell</button>
      </form>
    </div>
    {/* <SearchItem data={itemsarray}/> */}
    {/* {itemsarray.map(createitem)} */}
    
    </section>

  )
}

export default Sell;