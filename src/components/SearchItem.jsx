import React, { useState } from 'react';
import Item from './Item'
function SearchItem(props){
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = (props.data).filter((item1) => {
    return item1.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <input style={{marginTop:'20px'}} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='search item'/>
      
      {filteredData.map((item1,index) => {
        return <Item key={index} id={index}  name={item1.name} quantity={item1.quantity} price={item1.price} />
      })}
    </div>
  );
};

export default SearchItem;
