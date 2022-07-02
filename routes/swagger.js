const routes = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

routes.use('/contacts/api-docs', swaggerUI.serve);
routes.get('/contacts/api-docs', swaggerUI.setup(swaggerDoc));

module.exports = routes;