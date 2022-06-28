const express = require('express')
const routes = require('express').Router();

routes.use('/', require('./contacts'))

module.exports = routes;