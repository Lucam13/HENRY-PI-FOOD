import React from "react";
import './Card.css'

export default function Card({name, image, diets, healthScore}) {
    
    return (
    <div className="container">
        <div className='card'>
            <img className="img" src={image} alt="imagen not found"/> 
            <h3>{name}</h3>
            <h4>{diets}</h4>
            <h4>HealthScore: {healthScore}</h4>
        </div>
    </div> 
    )
}