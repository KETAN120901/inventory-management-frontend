
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sell" element={<Sell />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="import" element={<Import />} />
          <Route path="export" element={<Export />} />
          <Route path="customers" element={<Customers />} />
          <Route path="*" element={<NoPage />} />
          <Route path="items/:name" element={<ItemProfile />} />
          <Route path="buy/:name" element={<CustomerProfile />} />
          {/* <Route path="sell/:name" element={<ItemProfile />} /> */}
          {/* <Route path="transactions/:name" element={<CustomerProfile />} /> */}
          <Route path="import/:name" element={<CustomerProfile />} />
          <Route path="export/:name" element={<CustomerProfile />} />
          <Route path="customers/:name" element={<CustomerProfile />} />
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



