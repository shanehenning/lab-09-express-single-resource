'use strict';

const express = require('express');
const pokeRouter = require('../route/router.js');
const port = 3000;

let server = module.exports = exports = express();

server.use('/api', pokeRouter);

server.listen(port, () => {
  console.log('server up on ' + port);
});
