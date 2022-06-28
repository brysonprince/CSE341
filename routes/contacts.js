const routes = require('express').Router();

const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.getAll);
routes.get('/:id', contactsController.getItem);

module.exports = routes;
