const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://cse341-contacts-frontend.netlify.app');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', require('./routes'));


mongodb.initDb((err, mongodb) => {
    if (err){
        console.log(err);
    }
    else{
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`)
        });
    }
});