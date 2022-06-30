const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}

/*const addContact = async (req, res) => {
  const contact = createContact(req, res);
  const result = await mongodb.getDb.db().collection('contacts').insertOne(contact);
  if(result.acknowledged) {
    res.status(201).send();
  }
  else {
    res.status(500).json(result.error || 'An error was encountered while adding the contact');
  }
}

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = createContact(req, res);
  const result = await mongodb.getDb.db().collection('contacts').replaceOne({ _id: contactId }, contact);
  if(result.modifiedCount > 0) {
    res.status(200).send();
  }
  else {
    res.status(500).json(result.error || 'An error was encountered while updating the contact');
  }
}

const removeContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = createContact(req, res);
  const result = await mongodb.getDb.db().collection('contacts').remove({ _id: contactId }, contact);
  if(result.modifiedCount > 0) {
    res.status(200).send();
  }
  else {
    res.status(500).json(result.error || 'An error was encountered while deleting the contact');
  }
}

// Not exported
function createContact (req, res) {
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    color: req.body.color,
    birthday: req.body.birthday,
  }
  return contact
}*/

module.exports = { 
  getAll,
  getContact
};