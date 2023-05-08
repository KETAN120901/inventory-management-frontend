import React from "react";
 function Customer(props){
    function handleClick(){
        props.onDelete(props.id);

    }
    var path ="./customers/"+props.customerName;
    return <div className="item-box"><a href={path} ><div>Customer-Name : {props.customerName}</div><div>Father-Name : {props.fatherName}</div><div>Village : {props.village}</div></a></div>
 }
 export default Customer;