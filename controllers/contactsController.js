const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
  catch (error) {
    res.status(500).json(error);
  }
};

const getContact = async (req, res) => {
  try{
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const addContact = async (req, res) => {
  try{
    const contact = createContact(req, res);
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if(result.acknowledged) {
      res.status(201).send();
    }
    else {
      res.status(500).json(result.error || 'Error adding contact');
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = createContact(req);
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if(result.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(result.error || 'Error updating contact');
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const removeContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = createContact(req);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId }, contact);
    if(result.deletedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(result.error || 'An error was encountered while deleting the contact');
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
}

// Not exported, just a helper
function createContact (req) {
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    favoriteColor: req.body.color,
    birthday: req.body.birthday,
  }
  return contact
}

module.exports = { 
  getAll,
  getContact,
  addContact,
  updateContact,
  removeContact
};