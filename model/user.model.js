const mongoose = require('mongoose');
const connection = require('../config/mongo.db')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    recipes: [{
        name: String,
        ingredients: [{
            name: String,
            weight: Number,
            price: String
        }]
    }]
}, {
    timestamps: true
});


const User = mongoose.model('user', UserSchema);

//beforeEach(() => {
//   connection.collections.user.drop();
//});

// Add a 'dummy' user (every time you require this file!)
const user = new User({
    name: 'Joe',
    recipes:[
        { name: "Pizza", 
        ingredients: [{
            name: "kaas", weight: 42069, price: "3,80"
        }]},
        { name:"Cake", 
        ingredients: [{
            name: "eieren", weight: 2, price: "4,00"
        }]}
    ]}).save();

module.exports = User;