const express = require('express')
const { get } = require('.')
const router = express.Router()
const db = require('../database')

// post purchase information for each user transaction:
router.post('/', (req,res) => {
  
  // get info from client
	let { firstName, lastName, phoneNumber, items, quantity} = req.body

  function postTransaction() {

    return new Promise((resolve,reject) => {

      // post current transaction to db
      let insertPurchase = `INSERT INTO purchase (first_name,last_name,phone_number,purchase_time) VALUES('${firstName}', '${lastName}', '${phoneNumber}',NOW())`;

      db.query(insertPurchase, (err, res) => {   
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

      // insert individual item info into db: 
      for (let i = 0; i < productIDs.length; i++) {

        let insertPurchaseProduct = `INSERT INTO purchase_product VALUES(${purchaseID},${productIDs[i]},${quantities[i]})`;

        db.query(insertPurchaseProduct, (err, res) => {   
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
  