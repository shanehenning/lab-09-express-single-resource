'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Constructor = require('../model/constructor.js');
const AppError = require('../lib/app_error.js');

let pokeRouter = module.exports = exports = new Router();

let all = {
  squirtle: {
    name: 'squirtle',
    type: 'water',
    'final evolution': 'Blastoise'
  }
};

pokeRouter.get('/pokemon/all', (req,res) =>{
  res.status(200).send(JSON.stringify(Object.keys(all)) + '\n');
});

pokeRouter.get('/', (req, res) => {
  return res.status(404).send(JSON.stringify(AppError.error404('Unregistered location, please try /api/pokemon/')));
});

pokeRouter.get('/pokemon/', (req, res) => {
  return res.status(400).send(JSON.stringify(AppError.error400('No id inputted.')));
});

pokeRouter.get('/pokemon/:id', (req, res) => {
  if (!all[req.params.id]) {
    return res.status(404).send(JSON.stringify(AppError.error404('Pokemon not found!')) + '\r\n');
  }
  return res.status(200).send(JSON.stringify(all[req.params.id]) + '\r\n');
});

pokeRouter.post('/pokemon/:id', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send(JSON.stringify(AppError.error400('No data inputted for pokemon ' + req.params.id + '.')) + '\r\n');
  }
  let poke = new Constructor(req.body);
  all[req.params.id] = poke;
  return res.status(200).send('Pokemon ' + req.params.id + ' added: ' + JSON.stringify(poke) + '\r\n');
});

pokeRouter.put('/pokemon/:id', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.status(400).send(JSON.stringify(AppError.error400('No data inputted for pokemon ' + req.params.id + '.')) + '\r\n');
  }
  else if (!all[req.params.id]) {
    return res.status(404).send(JSON.stringify(AppError.error404('Pokemon does not yet exist on server.')) + '\r\n');
  }
  all[req.params.id] = {
    'name': req.body.name,
    'type': req.body.type,
    'final evolution': req.body['final evolution']
  };
  return res.status(200).send('Pokemon ' + req.params.id + ' updated: ' + JSON.stringify(all[req.params.id]) + '\r\n');
});

pokeRouter.delete('/pokemon/:id', (req, res) => {
  if(!all[req.params.id]){
    return res.status(404).send(JSON.stringify(AppError.error404('Pokemon does not yet exist on server.')) + '\r\n');
  }
  delete all[req.params.id];
  return res.status(400).send(JSON.stringify(AppError.error204('Pokemon ' + req.params.id + ' was deleted!')) + '\r\n');
});
