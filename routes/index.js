const routes = require('express').Router();

routes.get('/', (req, res) =>{
    res.send('Emmie Prince');
})

module.exports = routes;