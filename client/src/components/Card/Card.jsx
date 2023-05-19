import React from "react";

export default function Card({name, image, diets}) {
    
    return (
        <div>
            <h3>{name}</h3>
            <h4>{diets}</h4>
            <img src={image} alt="imagen not found" width="200px" height="250px"/> 
        </div>
    )
}