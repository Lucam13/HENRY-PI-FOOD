import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes } from "../actions";
import { Link } from "react-router-dom"
import Card from "./Card";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)

    useEffect(()=> {
        dispatch(getRecipes())
    }, [dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(getRecipes());
    }


    return(
     <div> 
           <Link to= '/recipes'>Crear Receta</Link>  
           <h1>Henry Food</h1>
           <button onClick={event =>{handleClick(event)}}>
              Volver a cargar las recetas           
           </button>
          <div>
           <label>Sort by HealthScore</label>
             <select>
                <option value='min'>0-100</option>
                <option value='max'>100-0</option>
            </select>
            <label>Sort alphabetically</label>
             <select>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
          </div>
          <div>
             <label>Filter By Diets</label>
             <select>
                <option value="All">Todas</option>
                <option value="gluten free">gluten free</option>
                <option value="dairy free">dairy free</option>
                <option value="vegetarian">vegetarian</option>
                <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                <option value="vegan">vegan</option>
                <option value="primal">primal</option>
                <option value="fodmap friendly">fodmap friendly</option>
                <option value="whole30">whole30</option>
              </select>
              <select>
                <option value="All">Todos</option>
                <option value="Created">Created</option>
                <option value="From Api">From Api</option>
              </select>
           </div>  
           {
            allRecipes?.map(el=>{
                return (
                <Link to={"/home/" + el.id}>
                <Card name={el.name} image={el.image} diets={el.diets}/>
                </Link>
                )
            })
            }
        </div>

    )

}