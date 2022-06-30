const routes = require('express').Router();

const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.getAll);
routes.get('/:id', contactsController.getContact);
//routes.post('/', contactsController.addContact);
//routes.put('/:id', contactsController.updateContact);
//routes.delete('/:id', contactsController.removeContact);

module.exports = routes;
