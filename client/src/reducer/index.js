
const initialState = {
    recipes : [], 
    allRecipes : [],
    diets: [],
    detail: {}
}

function rootReducer(state = initialState, action ){
    switch(action.type) { 
        case 'GET_RECIPES':
           
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case 'FILTER_BY_DIETS' : 
            const allRecipes = state.allRecipes
            const dietsFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload))
            return {
                ...state, 
                recipes : dietsFiltered
            }
            case 'FILTER_CREATED' :
                const createdFilter = action.payload ==='created' ? state.allRecipes.filter(el => isNaN(el.id)) : state.allRecipes.filter(el => !isNaN(el.id));
                return {
                    ...state,
                    recipes: action.payload === 'All' ? state.allRecipes : createdFilter
                }

            case 'ORDER_BY_NAME':
                let sortedArr = [...state.recipes];   
                sortedArr = action.payload === 'asc' ?
                sortedArr.sort(function(a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    } 
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0; 
                }) : 
                sortedArr.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    recipes: sortedArr
                }
                
                case 'ORDER_BY_SCORE':
                    let scoring = [...state.recipes]
                     scoring = action.payload === 'min' ?
                     scoring.sort(function (a, b){
                        if (a.healthScore > b.healthScore){
                            return 1;
                        }
                        if (b.healthScore > a.healthScore){
                            return -1;
                        }
                        return 0
                    }):
                    scoring.sort(function (a,b){
                        if(a.healthScore > b.healthScore){
                            return -1
                        }
                        if (b.healthScore > a.healthScore){
                            return 1
                        }
                        return 0
                    })
                    return {
                        ...state,
                        recipes:scoring
                    }
                    case 'GET_NAME_RECIPES':
                        return {
                            ...state,
                            recipes: action.payload
                        }
                    case 'POST_RECIPE':
                        return{
                            ...state,
                        }    
                    case 'GET_DIETS':
                        return {
                            ...state,
                            diets:action.payload
                        }
                    case 'GET_DETAILS':
                        return{
                            ...state,
                            detail: action.payload
                        }        
                default:
                   return state;
    }

}

export default rootReducer;