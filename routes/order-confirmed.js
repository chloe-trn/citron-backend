const express = require('express')
const router = express.Router()

// check if Stripe payment is successful: 
router.post('/', (req,res) => {
	let { message, id } = req.body
	try {
		if(message === 'Stripe Payment Method Successfully Created'){
			res.json({
				message: "Payment Successful",
				success: true
			})
		}
		else {
			throw new Error('Strip Payment Method Not Successful')
		}
	} catch (err) {
		res.json({
			message: `${err}`,
			success: false
		})
	}
})

module.exports = router
  