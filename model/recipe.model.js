const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: String,
    description: String,
    imagePath: String,
    ingredients:[{ 
        name: String,
        amount: Number
     }]
});

const Recipe = mongoose.model('recipe', RecipeSchema);

const recipe1 = new Recipe({
    name: 'Tasty Schnitzel',
    description: 'A super-tasty Schnitzel - just awesome!',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    ingredients : [
        {name: "Meat", amount: 1 },
        { name: "French Fries", amount: 20 }
    ]
})//.save();

const recipe2 =  new Recipe({
    name: 'Big Fat Burger',
    description: 'What else you need to say?',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    ingredients : [
        {name: "Buns", amount: 2 },
        { name: "Meat", amount: 1 }
    ]
})//.save();

module.exports = Recipe;