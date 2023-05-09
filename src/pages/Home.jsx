import React, { useEffect,useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Item from "../components/Item";
import axios from 'axios';
import SearchItem from '../components/SearchItem';
function Home() {
  const [itemsarray,setitemsarray] = useState([]);
  useEffect(() => {
    axios.get('https://inventory-manager-api-h3qs.onrender.com/')
      .then(response => {
        setitemsarray(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
    
  }, []);
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
    name:"",
    price:"",
    quantity:""
  })
  
  function handleChange(event){
    const {name,value}=event.target
    setitem(previtem => {
        
        return { ...previtem,[name]:value};
    })
  }
  function handleClick(event){
    axios.post('https://inventory-manager-api-h3qs.onrender.com/', item)
  .then(response => {
    // console.log('Response from server:', response.data);
  })
  .catch(error => {
    console.error('Error sending POST request:', error);
  });
  }
  itemsarray.reverse();
  return (
    <section className='home-section'>
    
    <div>
      <form className='item-form' action='/'>
        <input type="text" placeholder='Item-name' name='name' value={item.name} onChange={handleChange}/>
        <input type="text" placeholder='buying-price' name='price' value={item.price} onChange={handleChange}/>
        <input type="text" placeholder='quantity'name='quantity' value={item.quantity} onChange={handleChange}/>
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
    <SearchItem data={itemsarray}/>
    {/* {itemsarray.map(createitem)} */}
    
    </section>

  )
}

export default Home;