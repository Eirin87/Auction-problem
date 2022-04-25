var express = require('express');
const user = require('./user.controller.js');
var router = express.Router();

router.post('/signup', user.create);

router.post('/login', user.login);

module.exports = router;
