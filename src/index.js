
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Sell from "./pages/Sell"
import Transactions from "./pages/Transactions";
import Import from "./pages/Import";
import Export from "./pages/Export";
import Customers from "./pages/Customers";
import NoPage from "./pages/NoPage";
import ItemProfile from "./pages/ItemProfile";
import CustomerProfile from "./pages/CustomerProfile";


export default function App() {
  
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('https://localhost:8000/api')
  //     .then(response => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="https://inventory-management-aa64.onrender.com/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="https://inventory-management-aa64.onrender.com/sell" element={<Sell />} />
          <Route path="https://inventory-management-aa64.onrender.com/catalog" element={<Catalog />} />
          <Route path="https://inventory-management-aa64.onrender.com/transactions" element={<Transactions />} />
          <Route path="https://inventory-management-aa64.onrender.com/import" element={<Import />} />
          <Route path="https://inventory-management-aa64.onrender.com/export" element={<Export />} />
          <Route path="https://inventory-management-aa64.onrender.com/customers" element={<Customers />} />
          <Route path="*" element={<NoPage />} />
          <Route path="https://inventory-management-aa64.onrender.com/items/:name" element={<ItemProfile />} />
          <Route path="https://inventory-management-aa64.onrender.com/buy/:name" element={<CustomerProfile />} />
          {/* <Route path="sell/:name" element={<ItemProfile />} /> */}
          {/* <Route path="transactions/:name" element={<CustomerProfile />} /> */}
          <Route path="https://inventory-management-aa64.onrender.com/import/:name" element={<CustomerProfile />} />
          <Route path="https://inventory-management-aa64.onrender.com/export/:name" element={<CustomerProfile />} />
          <Route path="https://inventory-management-aa64.onrender.com/customers/:name" element={<CustomerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <div>
    {data.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div> */}
  </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



