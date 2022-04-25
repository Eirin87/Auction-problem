var express = require('express');
const authenticateToken = require('../user/authenticateToken');
const auction = require('./auction.controller.js');
var router = express.Router();

router.post('/create', authenticateToken, auction.create);
router.get('/all', authenticateToken, auction.findAll);
router.post('/bid', authenticateToken, auction.bid);

module.exports = router;