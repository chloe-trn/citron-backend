const express = require('express')
const router = express.Router()
const db = require('../database')

// post user email into db: 
router.post('/', (req,res) => {
	let { email } = req.body

        if (email) { // check if email exists

            function postEmail() { 

                // insert email to db using parameterized query
                let insertEmail = `INSERT INTO newsletter (email) VALUES(?)`

                return new Promise((resolve,reject) => {
                    db.query(insertEmail, [email], (err, res) => {   
                        if (err) {
                            reject(err)
                        } else {
                            resolve(res)
                        }
                    }) 
                })
            }

            postEmail()
                .then(() => {
                    res.json({
                        message: "Email received",
                    })
                })
                .catch(() => {
                    res.json({
                        message: "Email is duplicate entry",
                    })
                })

        } else {
            res.json({
                message: "Email not received",
            })
        }
})

module.exports = router
  