import React from "react";
import { Link } from "react-router-dom";
 function Item(props){
    function handleClick(){
        props.onDelete(props.id);

    }
    var path ="items/"+props.name;
    return <div className="item-box"><Link to={path} ><div>Item-Name : {props.name}</div><div>Price : {props.price}</div><div>Quantity : {props.quantity}</div></Link></div>
 }
 export default Item;