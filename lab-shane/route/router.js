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

pokeRouter.get('/pokemon/:id', (req, res) => {
  let pokemon = all[req.params.id];
  if (pokemon) {
    return res.send(JSON.stringify(pokemon) + '\r\n');
  }
});

pokeRouter.post('/pokemon/', jsonParser, (req, res) => {
  if (all[req.body.name]) {
    res.send(405, 'Pokemon ' + req.body.name + ' already exists, cannot use POST.');
  }
  let poke = new Constructor(req.body);
  all[req.body.name] = poke;
  res.send('Pokemon ' + req.body.name + ' added: ' + JSON.stringify(poke) + '\r\n');
  console.log(all);
});

pokeRouter.put('/pokemon/', jsonParser, (req, res) => {
  if (!all[req.body.name]) {
    res.send(404, 'Pokemon does not yet exist on server.');
  }
  all[req.body.name] = {
    'name': req.body.name,
    'type': req.body.type,
    'final evolution': req.body['final evolution']
  };
  res.send('Pokemon ' + req.body.name + ' updated: ' + JSON.stringify(all[req.body.name]) + '\r\n');
  console.log(all);
});

pokeRouter.delete('/pokemon/:id', (req, res) => {
  delete all[req.params.id];
  res.send(204, 'Pokemon ' + req.body.name + ' deleted.' + '\r\n');
});
