// initial setup: 
const express = require('express');
const cors = require("cors");
const app = express(); 
const PORT = process.env.PORT || 5000; 

// routes file definitions: 
const indexRoute = require('./routes/index');
const orderConfirmedRoute = require('./routes/order-confirmed');
const menuRoute = require('./routes/menu');
const purchaseRoute = require('./routes/purchase');
const newsletterRoute = require('./routes/newsletter');
const stripeKeyRoute = require('./routes/stripe-key');

// enable CORS: 
app.use(cors());

// enable JSON use:
app.use(express.json()); 

// routes mapping:
app.use('/', indexRoute);
app.use('/order-confirmed', orderConfirmedRoute);
app.use('/menu', menuRoute); 
app.use('/purchase', purchaseRoute); 
app.use('/newsletter', newsletterRoute); 
app.use('/stripe-key', stripeKeyRoute); 

// testing: 
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})