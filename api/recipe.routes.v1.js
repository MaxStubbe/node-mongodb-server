//
// ./api/v1/recipes.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Recipe = require('../model/recipe.model');

//
// Geef een lijst van alle recipes.
//
routes.get('/recipes', function(req, res) {
    res.contentType('application/json');
    Recipe.find({})
        .then((recipes) => {
            // console.log(recipes);
            res.status(200).json(recipes);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke users. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/recipes/:id', function(req, res) {
    res.contentType('application/json');
    Recipe.findById(req.params.id)
        .then((recipe) => {
            // console.log(users);
            res.status(200).json(recipe);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/recipes', function(req, res) {
    var new_recipe = new Recipe(req.body);
    new_recipe.save(function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
    });
});

//
// Wijzig een bestaande user. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/users/23
//
routes.put('/recipes/:id', function(req, res) {

    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        "description" : req.body.description,
        "imagePath" : req.body.imagePath,
        "ingredients" : req.body.ingredients 
    };

    Recipe.findById(id)
        .then( recipe => {
            recipe.set(update);
            recipe.save();
            res.status(200).json(recipe);
            
        })
        .catch((error) => res.status(401).json(error));
      
});

//
// Verwijder een bestaande user.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/users/23
//
routes.delete('/recipes/:id', function(req, res) {
    var id = req.params.id;

    Recipe.findById(id)
        .then(recipe => { 
            recipe.remove();
            res.status(200).send("recipe verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;