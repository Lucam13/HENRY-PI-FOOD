import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName, orderByScore } from "../../actions";
import { Link } from "react-router-dom"
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)
    
    const [currentPage, setCurrentPage] = useState(1)
    const recipesPerPage = 9
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
     
    }

    function handleSortScore(event){
      event.preventDefault()
      dispatch(orderByScore(event.target.value))
      setCurrentPage(1)
     
    }

    function handleFilterDiets(event){
      dispatch(filterRecipesByDiets(event.target.value))
    }

    function handleFilterCreated(event) {
      dispatch(filterCreated(event.target.value))
    }

    return(
      <body id="background2">
     <div>   
            <h1 className="title2">The Menu</h1>   
                 
          <div className="navbar2">
             <div className="searchbar">
              <SearchBar/>  
             </div>
          <div>
              <Link to= '/recipes'>
                <button className="buttoncreate">Create Recipe</button>
              </Link> 
              <button className="buttonreload" onClick={event =>{handleClick(event)}}>
                    Reload Recipes          
              </button>
          </div> 
             
          <div className="filters">
            <label>Sort by HealthScore</label>
             <select onClick={event => {handleSortScore(event)}}>
                <option value=""></option>
                <option value='min'>0-100</option>
                <option value='max'>100-0</option>
              </select>
            <label>Sort alphabetically</label>
             <select onChange={event => handleSort(event)}>
                <option value=""></option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
             </select>
          
             <label>Filter By Diets</label>
             <select onChange={event => handleFilterDiets(event)}>
                <option value=""></option>
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

              <label>Filter By Origin</label>
              <select onChange={event => handleFilterCreated(event)}>
                <option value=""></option>
                <option value="All">Todos</option>
                <option value="created">Created</option>
                <option value="from api">From Api</option>
               </select> 
             </div>
          </div>
           
          
           {
            currentRecipes?.map(el=>{
                return (
                <Link to={"/recipes/" + el.id} key={el.id}>
                  <Card name={el.name} image={el.image} diets={el.diets} healthScore={el.healthScore} />
                </Link>
                )
            })
            }
              <div className="navbar">
              <Paginado 
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
              />
            </div>
        </div>
        </body>      
    )

}