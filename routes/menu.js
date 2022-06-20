const express = require('express')
const router = express.Router()
const db = require('../database')

// get full menu:
router.get('/', (req,res) => {
  
   let menu = "SELECT * FROM product"

   db.query(menu, (err, result) => {
     if (err) {
        res.json({
          message: `${err}`
        })
     } else {
      res.send(result)
     }
   })
})

// get pastry items only: 
router.get('/pastry', (req,res) => {
  
  let pastries = "SELECT product_id, name, price FROM product WHERE type = 'Pastry'"
 
  db.query(pastries, (err, result) => {
    if (err) {
      res.json({
        message: `${err}`
      })
    } else {
      res.send(result);
    }
  })
})

// get coffee items only: 
router.get('/coffee', (req,res) => {

  let coffee = "SELECT product_id, name, price FROM product WHERE type = 'Coffee'"

  db.query(coffee, (err, result) => {
    if (err) {
      res.json({
        message: `${err}`
      })
    } else {
      res.send(result)
    }
  })
})

// get tea items only: 
router.get('/tea', (req,res) => {

  let tea = "SELECT product_id, name, price FROM product WHERE type = 'Tea'";

  db.query(tea, (err, result) => {
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