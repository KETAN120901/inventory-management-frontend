import React from "react";
 function Item(props){
    function handleClick(){
        props.onDelete(props.id);

    }
    var path ="https://inventory-management-aa64.onrender.com/items/"+props.name;
    return <div className="item-box"><a href={path} ><div>Item-Name : {props.name}</div><div>Price : {props.price}</div><div>Quantity : {props.quantity}</div></a></div>
 }
 export default Item;