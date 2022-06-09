const routes = require('express').Router();

routes.get('/', (req, res) =>{
    res.send('Bryson Prince');
})

module.exports = routes;