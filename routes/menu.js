const express = require('express')
const router = express.Router()
const db = require('../database')

// get menu items:
router.get('/', (req,res) => {
   let category = req.query.category; // get the category query parameter
   let query;

   // if category is given, query the products of that type, otherwise, query all products
   if (category) { 
     query = 'SELECT product_id, name, price FROM product WHERE type = ?'
   } else { // otherwise, query all products
     query = 'SELECT * FROM product'
   }
  
   db.query(query, [category], (err, result) => {
     if (err) {
        res.json({
          message: `${err}`
        })
     } else {
      res.send(result)
     }
   })
})

module.exports = router