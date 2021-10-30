import React, { Component } from 'react';
// Input: like: boolean
// Otput: onClick
//when converting classes into functional components, need to remove all this 
//references and pass props as argument

const Like = (props) => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o";
    return (
        <i onClick={props.onClick} 
        style={{ cursor: "pointer" }}
        className={classes} 
        aria-hidden="true">
        </i>
    )
}
 
export default Like;