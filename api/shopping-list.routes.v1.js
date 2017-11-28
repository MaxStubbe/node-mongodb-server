//
// ./api/v1/recipes.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Ingredient = require('../model/ingredient.model');

//
// Geef een lijst van alle recipes.
//
routes.get('/shopping-list', function(req, res) {
    res.contentType('application/json');
    Ingredient.find({})
        .then((ingredients) => {
            // console.log(recipes);
            res.status(200).json(ingredients);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke users. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/ingredient/23
//
routes.get('/shopping-list/:id', function(req, res) {
    res.contentType('application/json');
    Ingredient.findById(req.params.id)
        .then((ingredient) => {
            // console.log(users);
            res.status(200).json(ingredient);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/ingredient
//
routes.post('/shopping-list', function(req, res) {
    var new_ingredient = new Ingredient(req.body);
    new_ingredient.save(function(err, task) {
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
routes.put('/shopping-list/:id', function(req, res) {
    
        res.contentType('application/json');
        var id = req.params.id;
    
        var update = { 
            "name" : req.body.name, 
            "amount" : req.body.amount
        };
    
        Ingredient.findById(id)
            .then( ingredient => {
                ingredient.set(update);
                ingredient.save();
                res.status(200).json(ingredient);
                
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
routes.delete('/shopping-list/:id', function(req, res) {
    var id = req.params.id;
    
        Ingredient.findById(id)
            .then(ingredient => { 
                ingredient.remove();
                res.status(200).send("ingredient verwijderd");
            })
            .catch(error => res.status(401).json(error));
});

module.exports = routes;