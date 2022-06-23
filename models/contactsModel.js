'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactSchema = new Schema({
  firstname: {
    type: String,
    required: 'Please enter the first name of the contact'
  },
  lastname: {
    type: String,
    required: 'Please enter the last name of the contact'
  },
  email: {
    type: String,
    required: 'Please enter the email of the contact'
  },
  color: {
    type: String,
    required: 'Please enter the favorite color of the contact'
  },
  birthday: {
    type: Date,
    required: 'Please enter the birthday of the contact in YYYY-MM-DD format'
  }
});

module.exports = mongoose.model('Contact', ContactSchema);