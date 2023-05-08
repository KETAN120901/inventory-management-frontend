import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Collapsible_navbar from "../components/Collapsible_navbar";
import Nav from "../components/Nav"
import Sidebar from "../components/Sidebar"
const Layout = () => {
  return (
    <>
      <Header/>
      <Nav/>
      
      <Collapsible_navbar/>
      
      <Footer/>
    </>
  )
};

export default Layout;