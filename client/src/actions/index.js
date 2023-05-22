import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes/',{

        });
        return dispatch ({
            type : 'GET_RECIPES',
            payload:json.data
        })
    }
}

export function filterRecipesByDiets(payload) {
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export function filterCreated(payload){
    return {
        type:'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return {
        type : 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload) {
    return{
        type:'ORDER_BY_SCORE',
        payload
    }
}


export function getNameRecipes(name){
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/recipes?name=' + name);
            return dispatch({
                type : 'GET_NAME_RECIPES',
                payload :json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        const info = await axios('http://localhost:3001/diets', {

        })
        return dispatch({ 
            type: 'GET_DIETS', 
            payload:info.data})
    }
}

export function postRecipe (payload){
    return async function(){
        try {
            const response = await axios.post('http://localhost:3001/recipes', payload)
            return response;
        } catch (error) {
            console.log("Error - ", error);
        }
    }
}


export function getDetail (id) {
    return async function (dispatch){ 
        try {
            const json = await axios.get('http://localhost:3001/recipes/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
