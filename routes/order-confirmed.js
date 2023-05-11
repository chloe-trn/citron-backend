require('dotenv').config();
const express = require('express');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const router = express.Router();

router.get('/', async (req, res) => {
	const sessionId = String(req.query.session_id)
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	const customerName = session.customer_details.name;

	console.log(session)

	res.json({customerName: customerName});
});

module.exports = router;