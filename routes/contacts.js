const routes = require('express').Router();

const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.getAll);

module.exports = routes;
