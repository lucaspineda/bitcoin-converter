const express = require('express');
const router = express.Router();
const BPIController = require('../controllers/BPI.controllers')

/* GET latest price data */
router.get('/prices/latest', BPIController.getLatestPrice);

/* GET latest prices data given the currency code and number of rows (count param) */
router.get('/prices/count/:currency', BPIController.getIndexLastPrices);

module.exports = router;