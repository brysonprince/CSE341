require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Contact = require('./models/contactsModel');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/contacts'); //importing route
routes(app); //register the route

app.listen(port, () => {
    console.log(`Contacts app listening on port ${port}`)
})