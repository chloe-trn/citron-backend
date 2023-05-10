const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    const API_KEY = process.env.STRIPE_KEY;

    if (!API_KEY) {
        res.json({ message: 'Stripe API key not available'});
    } else {
        res.json({ key: API_KEY });
    }
});

module.exports = router;