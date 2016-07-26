'use strict';

const Router = require('express').Router;
const bodyParser = require('body-parser');
const Constructor = require('../model/constructor.js');

let pokeRouter = module.exports = exports = new Router();
let all = {
  squirtle: {
    name: 'squirtle',
    type: 'water',
    'final evolution': 'Blastoise'
  }
};

pokeRouter.use(bodyParser.json());
let jsonParser = bodyParser.json();

pokeRouter.get('/pokemon/:id', (req,res) => {
  let pokemon = all[req.params.id];
  if(pokemon){
    return res.send(JSON.stringify(pokemon) + '\r\n');
  }
});

pokeRouter.post('/pokemon/', jsonParser, (req,res) => {
  if(all[req.body.name]){
    res.send(405, 'Pokemon ' + req.body.name + ' already exists, cannot use POST.');
  }
  let poke = new Constructor(req.body);
  all[req.body.name] = poke;
  res.send('Pokemon ' + req.body.name + ' added: ' + JSON.stringify(poke) + '\r\n');
  console.log(all);
});
