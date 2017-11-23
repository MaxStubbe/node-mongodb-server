const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: String,
    amount: Number
});

const Ingredient = mongoose.model('ingredient', IngredientSchema);

const ing1 = new Ingredient({
    name: "Apples", amount: 2
}).save();

const ing2 = new Ingredient({
    name: "Bread", amount: 5
}).save();

module.exports = Ingredient;