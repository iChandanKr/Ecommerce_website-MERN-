const express = require('express');
const router = express.Router();
const {isAuthenticatedUser} = require('../middlewares/auth');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentControllers');

router.route('/payment/process').post(isAuthenticatedUser,processPayment);
router.route('/stripeapikey').get(isAuthenticatedUser,sendStripeApiKey);


module.exports = router;