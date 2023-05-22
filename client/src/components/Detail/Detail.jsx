import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function Detail(props) {
    const dispatch = useDispatch() 
    const myRecipe = useSelector((state) => state.detail)
    const { recipeID } = useParams();

    useEffect(() => {
        dispatch(getDetail(recipeID));
    },[dispatch])
    console.log("RECIPE - ", myRecipe)
    return (
        <div>
            {
                <div> 
                    <div>
                        <h1 className='titulodetail'>{myRecipe?.nombre}</h1>
                    </div>
                    <div>
                        <img src={myRecipe?.image}/>
                    </div>
                    <div className="detalles">
                        <h3>Summary: </h3>
                        <h4 dangerouslySetInnerHTML={{ __html: myRecipe?.summary }}/>
                        <br></br>
                    
                        <h3 >Steps: </h3>
                        <h4>{myRecipe?.steps?.length ? myRecipe.steps : 'Does not include instructions'}</h4>
                        <br></br>
                        <h3>HealthScore: </h3>
                        <h4>{myRecipe?.healthScore}</h4>
                        <br></br>
                        <h3>Diets: </h3>
                        <h4>{myRecipe?.diets}</h4>
                    </div>
                </div>
            }

            <Link to='/home'>
                <button className='btn5'>Volver</button>
            </Link>
        </div>
        
    )
}
