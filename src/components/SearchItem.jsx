import React, { useState } from 'react';
import Item from './Item'
function SearchItem(props){
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = (props.data).filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <input style={{marginTop:'20px'}} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='search item'/>
      
      {filteredData.map((item,index) => {
        return <Item key={index} id={index}  name={item.name} quantity={item.quantity} price={item.price}/>
      })}
    </div>
  );
};

export default SearchItem;
