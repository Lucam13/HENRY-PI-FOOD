import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import './Detail.css'

export default function Detail(props) {
    const dispatch = useDispatch() 
    const myRecipe = useSelector((state) => state.detail)
    const { recipeID } = useParams();

    useEffect(() => {
        dispatch(getDetail(recipeID));
    },[dispatch])
    console.log("RECIPE - ", myRecipe)
    return (
      <body id="background3">
        <div>
            {
            <div > 
              <div>   
                <Link to='/home'>
                <button className='btn5'>Volver</button>
                  </Link>
               </div>
                    <div className="detailcontainer">
                        <h2 className='titulodetail'>{myRecipe?.name}</h2>
                    </div>
                    <div>
                        <img className="foodimage" src={myRecipe?.image}/>
                    </div>
                    <div className="summary">
                        <h3>Summary:</h3>
                        <h4 className="details" dangerouslySetInnerHTML={{ __html: myRecipe?.summary }}/>
                        <h3  className="details" >Steps: </h3>
                        <h4>{myRecipe?.steps?.length ? myRecipe.steps : 'Does not include instructions'}</h4>
                        <h3>HealthScore:</h3>
                        <h4>{myRecipe?.healthScore}</h4>
                        <h3>Diets:</h3>
                        <h4>{myRecipe?.diets}</h4>
                    </div>
                </div>
            }

        </div>
    </body>
    )
}
