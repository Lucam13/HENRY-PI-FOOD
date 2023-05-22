import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {postRecipe, getDiets} from '../../actions/';
import { useDispatch, useSelector } from "react-redux";
import './RecipeCreate.css'

export default function RecipeCreate(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const diets = useSelector((state)=> state.diets)
    const [errors, setErrors] = useState ({})
    const [ dietsSelected, setDietsSelected ] = useState([]);

    const [input, setInput] = useState({
        name:'',
        summary:'',
        healthScore: 0,
        image:'',
        steps:'',
        diets:[]
    })
   

    function validate(input) { 
        const errors = {};
        if (!input.name) errors.name = 'Please complete with a recipe name';
        if (!input.summary) errors.summary = 'Please add some comments about your recipe';
        if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
        if (!input.steps.length) errors.steps = 'Please detail the steps for your recipe';
        if (!input.diets.length) errors.diets = 'You must select at least one diet type';
        return errors;
    };



function handleChange(event) {
    setInput({
        ...input,
        [event.target.name] : event.target.value
    })
    setErrors(validate({
        ...input,
        [event.target.name] : event.target.value
    }));
    console.log(input)
}

function handleSelect(event){
    let { target : { value } } = event;
    
    value = parseInt(value);
    
    let filteredDiet = diets.find(el => el.id === value)

    if(input.diets.includes(value)) {
        alert('Diet already selected')
        return;
    }

    setInput({
        ...input,
             diets: [...input.diets, filteredDiet.id],
    })
    setDietsSelected([...dietsSelected, filteredDiet.name]);
}

function handleSubmit(event){
    event.preventDefault()
    input.steps = [input.steps];
    
    dispatch(postRecipe(input))
    alert('Recipe Created!')
    
    setInput({
        name:'',
        summary:'',
        healthScore:0,
        image:'',
        steps:'',
        diets:[]
    })
    navigate('/home')
}


function handleDelete(el) {
    setInput({
        ...input,
        diets: input.diets.filter(el => el.id !==el.id)
    })
}

    useEffect(()=>{
        dispatch(getDiets())
    }, []);

    return (
        <div>
               <Link to= '/Home'><button>Back</button></Link>
               <h1>Create your Recipe!</h1>
            <form onSubmit={(event =>handleSubmit(event))}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type='text'
                    value = {input.name}
                    name= 'name'
                    onChange={(event)=>handleChange(event)}
                    />
                    {errors.name && ( <p className="error">{errors.name}</p> )}
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                    type='text'
                    value = {input.summary}
                    name= 'summary'
                    onChange={(event)=>handleChange(event)}
                    />
                </div>
                <div>
                    <label>HealthScore:</label>
                    <input
                    type='number' min = "0" max="100"
                    value = {input.healthScore}
                    name= 'healthScore'
                    onChange={(event)=>handleChange(event)}
                    />
                    {errors.healthScore && ( <p className="error">{errors.healthScore}</p> )} 
                </div>
                <div>
                    <label>Steps:</label>
                    <input
                    type='text'
                    value = {input.steps}
                    name= 'steps'
                    onChange={(event)=>handleChange(event)}
                    />
                </div>        
                <div>
                    <label>Image:</label>
                    <input
                    type='text'
                    value = {input.image}
                    name= 'image'
                    onChange={(event)=>handleChange(event)}
                    />
                </div>
                <select name="diets" onChange={(event)=> handleSelect(event)}>
                    {diets.map((el)=> {
                        return (
                            <option value={el.id}>{el.name}</option>
                        )
                    })} 
                </select>
                <ul>
                    {
                        dietsSelected.map(el => <li>{el}</li>)
                    }
                </ul>
                <div className="cont"> 
                <button className="btn"  disabled={errors.healthScore || errors.name || errors.summary} type='submit'><span> Create Recipe</span><img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62"></img></button>
                </div>     
            </form>
                {input.diets.map (el => 
             <div>
                <p>{el}</p>
                
                <button className="botonx" onClick={()=> handleDelete(el)}>x</button>
             </div>
                )}
        </div>
    )
}


