import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'
import videocomida from "../videocomida.mp4"

export default function LandingPage(){
    
    return (
      <div id='hero'>
          
          <div className='promo'>
            <h1 className='title'>Welcome to</h1>
            <h1 className='title'>The Menu.</h1>
            <Link to='/home'>
                <button className='button'>Ingresar</button>
            </Link>
           </div>
            <video muted autoPlay loop >
                <source src={videocomida} type='video/mp4'/>
            </video>
    
     </div>    
    )
}