import React, { useState } from 'react';
import Customer from './Customer'
function SearchCustomer(props){
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = (props.data).filter((customer) => {
    return (customer.customerName).toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <input style={{marginTop:'20px'}} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='search customer'/>
      {filteredData.map((customer,index) => {
        return <Customer key={index} id={index}  customerName={customer.customerName} fatherName={customer.fatherName} village={customer.village}/>
      })}
    </div>
  );
};

export default SearchCustomer;
