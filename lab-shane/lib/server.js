'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const urlParser = require('./urlParser.sj');
const pokeRouter = require('../route/router.js');
const port = 3000;

let server = express();

server.use('/api', pokeRouter);
server.use(bodyParser.json());

server.listen(port, () => {
  console.log('server up on ' + port);
});
