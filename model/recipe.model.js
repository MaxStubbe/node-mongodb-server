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

module.exports = Recipe;