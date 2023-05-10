require('dotenv').config();
const express = require('express');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const router = express.Router();
const db = require('../database');

let menuItems = new Map();
const query = 'SELECT product_id, name, price FROM product';

db.query(query, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    menuItems = new Map(result.map(item => [item.product_id, { price: item.price, name: item.name }]));
  }
});

router.post('/', async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.create({
        custom_text: {
            submit: {
                message: "THIS IS A DEMO SITE. PAYMENTS WILL NOT ACTUALLY GO THROUGH. For the credit card information, use 4242 4242 4242 4242, any MM/YY in the future, and any three digit CVC. All other information can be random."
            }
          },
          payment_method_types: ["card"],
          mode: "payment",
          line_items: req.body.items.map(item => {
            const storeItem = menuItems.get(item.itemID)
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: storeItem.name,
                },
                unit_amount: parseFloat(storeItem.price) * 100,
              },
              quantity: item.quantity,
            }
          }),
          success_url: `${process.env.STRIPE_SUCCESS_URL}`,
          cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
          customer_email: 'test@email.com'
        })
        res.json({ url: session.url })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
});

module.exports = router;