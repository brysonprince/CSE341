const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/', require('./contacts'));

module.exports = routes;