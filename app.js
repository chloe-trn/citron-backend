// initial setup: 
const express = require('express');
const app = express(); 
const PORT = 5000; 

// routes: 
const indexRoute = require('./routes/index');
const testRoute = require('./routes/test');
const orderConfirmedRoute = require('./routes/order-confirmed');
const menuRoute = require('./routes/menu');
const purchaseRoute = require('./routes/purchase');
const newsletterRoute = require('./routes/newsletter');

// middleware:
// functions that get called before a request is made 
// called using app.use
// if you call it in the main app.js file, 
// the middle ware is enabled for all requests

// enable JSON use:
app.use(express.json()); 

// routes:
app.use('/', indexRoute);
app.use('/test', testRoute);
app.use('/order-confirmed', orderConfirmedRoute);
app.use('/menu', menuRoute); 
app.use('/purchase', purchaseRoute); 
app.use('/newsletter', newsletterRoute); 

// testing: 
app.listen(PORT, () => {
  console.log("server is running");
})