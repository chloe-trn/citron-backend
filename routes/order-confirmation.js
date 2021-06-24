var express = require('express');
var router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
	let { message, id } = req.body
	try {
		if(message === 'Stripe Payment Method Successfully Created'){
			console.log("Payment Successful")
			res.json({
				message: "Payment Successful",
				success: true
			})
		}
	} catch (error) {
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

module.exports = router;