This is an Express server designed to interact with the Citron Café client and has various API endpoints defined. 
<br>
## API Endpoints
* __POST /newsletter:__ Adds a user's email to the database if it doesn't already exist.
* __GET /menu:__ Retrieves menu item data, either by category or all products.
* __POST /purchase:__ Adds a user's data, as well as the items in their shopping cart, to the database.
* __POST /checkout-session:__ Manages the connection to the Stripe API for handling checkout transaction. The user's shopping cart data is passed through and a confirmation page URL will be returned if the transaction is successful.
* __POST /order-confirmed:__ Checks the success of the Stripe API checkout transaction.
