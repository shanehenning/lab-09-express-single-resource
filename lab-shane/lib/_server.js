'use strict';

const express = require('express');
const pokeRouter = require('../route/router.js');
const port = 5000;

let server = express();

server.use('/api', pokeRouter);

module.exports = exports = server.listen(port, () => {
  console.log('server up on ' + port);
});
