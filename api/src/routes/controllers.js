const axios = require ('axios');
const {Recipe, Diet} = require('../db');

require ('dotenv').config()

const getApiInfo = async ()=>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${process.env.API_KEY}`)

    const apiInfo = await apiUrl.data.results.map(ele =>{
        return{
            id: ele.id,
            image: ele.image,
            name : ele.title,
            summary : ele.summary,
            healthScore: ele.healthScore,
            steps : ele.analyzedInstructions.map(ele=>{return ele.steps.map(ele => {return ele.step})}),
            diets : ele.diets
        }
    })
    return apiInfo;
}


const getDbInfo = async () => {
    const allRecipes = await Recipe.findAll ({
        include: {model:Diet,
            attributes: ["name"],
            through:{
                attributes:[],
            }}
    })


   return allRecipes.map(el => ({ 
        ...el.dataValues,
        diets: el.dataValues.diets.map(el => el.name)
    }));
}; 


const getAllRecipe = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const InfoTotal = apiInfo.concat(dbInfo);
    return InfoTotal;
}


module.exports = {
    getAllRecipe
}