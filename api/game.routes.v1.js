//
// ./api/v1/games.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Game = require('../model/game.model');

//
// Geef een lijst van alle games.
//
routes.get('/games', function(req, res) {
    res.contentType('application/json');
    Game.find({})
        .then((games) => {
            // console.log(games);
            res.status(200).json(games);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke games. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/games/23
//
routes.get('/games/:id', function(req, res) {
    res.contentType('application/json');
    Game.findById(req.params.id)
        .then((game) => {
            // console.log(games);
            res.status(200).json(game);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Voeg een game toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/games
//
routes.post('/games', function(req, res) {
    var new_game = new Game(req.body);
    new_game.save(function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
    });
});

//
// Wijzig een bestaande game. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de game mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/games/23
//
routes.put('/games/:id', function(req, res) {

    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        "description" : req.body.description
    };

    Game.findById(id)
        .then( game => {
            game.set(update);
            game.save();
            res.status(200).json(game);
            
        })
        .catch((error) => res.status(401).json(error));
      
});

//
// Verwijder een bestaande game.
// Er zijn twee manieren om de id van de games mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/games/23
//
routes.delete('/games/:id', function(req, res) {
    var id = req.params.id;

    Game.findById(id)
        .then(game => { 
            game.remove();
            res.status(200).send("game verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;