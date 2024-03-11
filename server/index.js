const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://db:27017/")

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))

var ingredientSchema = new mongoose.Schema({
  name: String
})

var recipeSchema = new mongoose.Schema({
  name: { type: String },
  lastModified: { type: String },
  directions: { type: String },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
})

const Recipe = mongoose.model('Recipe', recipeSchema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)

app.post('/recipes', async (req, res) => {
  const { name, lastModified, directions, ingredients } = req.body
  const ingredientNames = ingredients.split(',')

  const ingredientIds = [];
  for (const ingredientName of ingredientNames) {
    let ingredient = await Ingredient.findOne({ name: ingredientName.trim() })
    if (!ingredient) {
      ingredient = new Ingredient({ name: ingredientName.trim() })
      await ingredient.save()
    }
    ingredientIds.push(ingredient._id)
  }

  const newRecipe = new Recipe({ name, lastModified, directions, ingredients: ingredientIds })
  await newRecipe.save()

  const structuredRecipe = await Recipe.findById(newRecipe._id).populate('ingredients');
  res.send(structuredRecipe);
})

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find().populate('ingredients')
  res.send(recipes)
})

app.delete('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  await Recipe.findByIdAndDelete(recipeId)
  await cleanupIngredients()
  res.send('Success')
})

app.put('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  const { name, lastModified, directions, ingredients } = req.body
  
  const ingredientNames = ingredients.split(',')

  const ingredientIds = []

  for (const ingredientName of ingredientNames) {
    let ingredient = await Ingredient.findOne({ name: ingredientName.trim() })
    if (!ingredient) {
      ingredient = new Ingredient({ name: ingredientName.trim() })
      await ingredient.save()
    }
    ingredientIds.push(ingredient._id)
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
    name, 
    lastModified, 
    directions,
    ingredients: ingredientIds
  }, { new: true })

  const structuredRecipe = await Recipe.findById(updatedRecipe._id).populate('ingredients');
  res.send(structuredRecipe);
})

app.get('/ingredients', async (req, res) => {
  const ingredients = await Ingredient.find()
  res.send(ingredients)
})

app.delete('/ingredients/:id', async (req, res) => {
  const ingredientId = req.params.id
  await Ingredient.findByIdAndDelete(ingredientId)
  res.send('success')
})

async function cleanupIngredients() {
  const remainingRecipes = await Recipe.find();
  const referencedIngredients = [];
  
  remainingRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredientId => {
      if (!referencedIngredients.includes(ingredientId)) {
        referencedIngredients.push(ingredientId);
      }
    });
  });

  const unusedIngredients = await Ingredient.find({ _id: { $nin: referencedIngredients } });

  for (const ingredient of unusedIngredients) {
    await ingredient.deleteOne();
  }
}

app.use('/', express.static(path.join(__dirname, '/build')))

app.listen(port, '0.0.0.0')
console.log(`Running on http://0.0.0.0:${port}`)