import React from "react";
import './Paginado.css'


export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i + 1)
    }
    return (
        <nav>
            <li className="paginado">
                { pageNumbers && pageNumbers.map(number => (
                    <ul className="buttonPaginado" key={number}>
                    <button onClick={() => paginado(number)}>{number}</button>
                    </ul>
                ))}
            </li>
        </nav>
    )
}