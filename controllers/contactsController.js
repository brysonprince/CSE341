const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  /*  
  #swagger.description = 'Gets all Contacts'
  #swagger.responses[200] = { description: 'Successful Get Request' }
  #swagger.responses[500] = { description: 'Internal Server Error' }
  */
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
  catch (error) {
    res.status(500).json(error);
  };
};

const getContact = async (req, res) => {
  /*  
  #swagger.description = 'Gets one Contact'
  #swagger.responses[200] = { description: 'Successful Get Request' }
  #swagger.responses[500] = { description: 'Internal Server Error' }
  */
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
};

const createContact = async (req, res) => {
  /*  
  #swagger.description = 'Adds a new Contact'
  #swagger.parameters['Contact'] = {
    in: 'body',
    description: 'New Contact',
    schema: {
      $firstName: 'Bryson',
      $lastName: 'Prince',
      $email: 'bryson.prince@fake.com',
      $birthday: '01/21/1995',
      $favoriteColor: 'blue'
    }
  }
  #swagger.responses[201] = { description: 'Contact successfully added' }
  #swagger.responses[500] = { description: 'Internal Server Error' }
  */
  try {
    let contact = buildContact(req);
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if(result.acknowledged) {
      res.status(201).json(result);
    }
    else {
      res.status(500).json(result.error || 'Error adding contact');
    }
  }
  catch (error) {
    res.status(500).json(result.error || 'Error adding contact');
  };
};

const updateContact = async (req, res) => {
  /*  
  #swagger.description = 'Updates an existing Contact'
  #swagger.parameters['Contact'] = {
    in: 'body',
    description: 'New Contact Update',
    schema: {
      $firstName: 'Bryson',
      $lastName: 'Prince',
      $email: 'new.email@fake.com',
      $birthday: '01/21/1995',
      $favoriteColor: 'blue'
    }
  }
  #swagger.responses[204] = { description: 'Contact updated' }
  #swagger.responses[500] = { description: 'Internal Server Error' }
  */
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = buildContact(req);
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if(result.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(result.error || 'Error updating contact');
    }
  }
  catch (error) {
    res.status(500).json(result.error || 'Error adding contact');
  };
};

const removeContact = async (req, res) => {
  /*  
  #swagger.description = 'Removes a Contact'
  #swagger.responses[204] = { description: 'Contact removed' }
  #swagger.responses[500] = { description: 'Internal Server Error' }
  */
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
    if(result.deletedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(result.error || 'An error was encountered while deleting the contact');
    }
  }
  catch (error) {
    res.status(500).json(result.error || 'Error adding contact');
  };
};

// Not exported, just a helper
function buildContact (req) {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    favoriteColor: req.body.favoriteColor
  };
  return contact;
}

module.exports = { 
  getAll,
  getContact,
  createContact,
  updateContact,
  removeContact
};