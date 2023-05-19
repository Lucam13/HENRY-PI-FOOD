import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName } from "../../actions";
import { Link } from "react-router-dom"
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import './Home.css'

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=> {
        dispatch(getRecipes())
    }, [dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(getRecipes());
    }

    function handleSort (event){
      event.preventDefault();
      dispatch(orderByName(event.target.value))
      setCurrentPage(1)
      setOrden(`Ordenado $(event.target.value)`)
    }

    function handleFilterDiets(event){
      dispatch(filterRecipesByDiets(event.target.value))
    }

    function handleFilterCreated(event) {
      dispatch(filterCreated(event.target.value))
    }

    return(
     <div> 
           <Link to= '/recipes'>Crear Receta</Link>  
            <h1 className="title">Henry Food</h1> 
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
             <select onChange={event => handleSort(event)}>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
          </div>
          <div>
             <label>Filter By Diets</label>
             <select onChange={event => handleFilterDiets(event)}>
                <option value="All">Todas</option>
                <option value="gluten free">gluten free</option>
                <option value="dairy free">dairy free</option>
                <option value="vegetarian">vegetarian</option>
                <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                <option value="vegan">vegan</option>
                <option value="primal">primal</option>
                <option value="fodmap friendly">fodmap friendly</option>
                <option value="whole 30">whole30</option>
              </select>
              <select onChange={event => handleFilterCreated(event)}>
                <option value="All">Todos</option>
                <option value="created">Created</option>
                <option value="from api">From Api</option>
              </select>
              <Paginado 
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
              />
           </div>  
           {
            currentRecipes?.map(el=>{
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