const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: String,
    amount: Number
});