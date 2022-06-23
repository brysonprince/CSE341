'use strict';
module.exports = function(app) {
  var contacts = require('../controllers/contactsController');

  // contacts Routes
  app.route('/contacts')
    .get(contacts.list_all_contacts)
    .post(contacts.create_a_contact);


  app.route('/contacts/:contactId')
    .get(contacts.read_a_contact)
    .put(contacts.update_a_contact)
    .delete(contacts.delete_a_contact);
};
