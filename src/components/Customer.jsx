import React from "react";
import { Outlet, Link } from "react-router-dom";
 function Customer(props){
    function handleClick(){
        props.onDelete(props.id);

    }
    var path =props.customerName;
    return <div className="item-box"><Link to={path}><div>Customer-Name : {props.customerName}</div><div>Father-Name : {props.fatherName}</div><div>Village : {props.village}</div></Link></div>
 }
 export default Customer;