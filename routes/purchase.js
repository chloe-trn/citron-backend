const express = require('express')
const { get } = require('.')
const router = express.Router()
const db = require('../database')

// post purchase information for each user transaction:
router.post('/', (req,res) => {
  
  // get info from client
	let { items, quantity} = req.body

  function postTransaction() {

    return new Promise((resolve,reject) => {

      // post current transaction to db
      let insertPurchaseTime = `INSERT INTO purchase (purchase_time) VALUES (NOW())`;

      db.query(insertPurchaseTime, (err, res) => {   
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      }) 
     
    })
  }

  function postItemInfo(transaction) {

    return new Promise((resolve,reject) => {

      // get values of each item's purchase_id, product_id, and quantity purchased
      let purchaseID = transaction.insertId;
      let productIDs = Object.values(items);
      let quantities = Object.values(quantity);

      let values = [];

      // create an array of placeholders and values for each item
      for (let i = 0; i < productIDs.length; i++) {
        values.push([purchaseID, productIDs[i], quantities[i]]);
      }

      for (let i = 0; i < productIDs.length; i++) {

        // insert individual item info into db with a single query
        let insertPurchaseProduct = `INSERT INTO purchase_product (purchase_id, product_id, quantity) VALUES ?`;

        db.query(insertPurchaseProduct, [values], (err, res) => {   
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        }) 

      }
    })
  }

  // promise chaining to ensure proper database info insertion 
  postTransaction()
    .then((res) => {
      postItemInfo(res)
    })
    .then(() => {
      res.json({
        message: "Purchase received",
      })
    })
    .catch((err) => {
      res.json({
        message: `${err}`
      })
    })
})

module.exports = router
  