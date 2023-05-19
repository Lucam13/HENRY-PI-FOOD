
const initialState = {
    recipes : [], 
    allRecipes : []
}

function rootReducer(state = initialState, action ){
    switch(action.type) { 
        case 'GET_RECIPES':
            console.log("RECIPE - ", action.payload[0])
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
                let sortedArr = action.payload === 'asc' ?
                state.allRecipes.sort(function(a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0; 
                }) : 
                state.allRecipes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    allRecipes: sortedArr
                }    
                default:
                   return state;
    }

}

export default rootReducer;