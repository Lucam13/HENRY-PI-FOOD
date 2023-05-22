const { Router } = require('express');
const axios = require("axios")
const { Recipe, Diet } = require("../db")
const { getAllRecipe } = require("./controllers")
require('dotenv').config()

const router = Router();

 


router.get('/recipes', async (req,res)=>{
    const name = req.query.name
    let recipesTotal = await getAllRecipe();
    if(name){
        let recipeName = await recipesTotal.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ? 
        res.status(200).send(recipeName) :
        res.status(404).send("No esta la receta");
    } else {
        res.status(200).send(recipesTotal) 
    }
})

const getAllDiets = async () => {
    const diets = await Diet.findAll();

    return diets;
}

router.get('/diets', async (req, res, next) => {
    try {
        let diets = await getAllDiets();

        res.status(200).json(diets);
    } catch (error) {
        next({
            status: 500,
            message: "Error getting all diets from database",
        });
    }
})

router.post('/recipes', async (req,res)=> { 
    const { name, summary, image, steps, healthScore, diets } = req.body
    
    const recipeCreated = await Recipe.create({
            name,
            summary,
            image,
            healthScore,
            steps,
        })
        
        recipeCreated.addDiet(diets)
        
        res.status(200).send(recipeCreated)
    
})


router.get("/recipes/:id", async (req, res)=>{
    const id = req.params.id                         
    const recipes = await getAllRecipe()
    if(id) {
        let recipeId = recipes.filter(ele => ele.id == id)
        recipeId.length?
        res.status(200).json(recipeId[0]) : 
        res.status(400).json("Recipe Id not found")
    }
})



module.exports = router;
