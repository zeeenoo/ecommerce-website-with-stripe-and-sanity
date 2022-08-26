import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) { //req is the request object and res is the response object
  if (req.method === 'POST') {
    try {
      console.log(req.body.cartItems);
      const params = {
        submit_type: 'pay', // The value of this parameter must be pay to indicate that this is a payment request.
        mode: 'payment', // The value of this parameter must be payment to indicate that this is a payment request.
        payment_method_types: ['card'], // The value of this parameter must be card to indicate that this is a payment request.
        billing_address_collection: 'auto', // this parameter is used to collect the billing address of the user.
        shipping_options: [
          { shipping_rate: 'shr_1LapSbBDUOJjdHzjrHRkr8X4' }, //this is the id of the shipping rate that we created in stripe dashboard
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/kkcfc8hi/production/') //replace the image- with the cdn url
          .replace('-webp', '.webp'); 

          return {
            price_data: { 
              currency: 'eur', //currency of the product
              product_data: { 
                name: item.name, //name of the product 
                images: [newImage], //replace the image- with the cdn url
              },
              unit_amount: item.price * 100,//multiply by 100 to get the cents value of the price
            },
            adjustable_quantity: {
              enabled:true,//true if you want to allow the user to change the quantity of the item
              minimum: 1, // minimum quantity
            },
            quantity: item.quantity //quantity of the item in the cart
          }
        }),
        success_url: `${req.headers.origin}/success`, // redirect to success page after payment
        cancel_url: `${req.headers.origin}/canceled`, // redirect to cancel page after payment
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params); //create a session with the params above 

      res.status(200).json(session); //return the session to the client 
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message); //return the error to the client 
    }
  } else {
    res.setHeader('Allow', 'POST'); //allow only POST requests 
    res.status(405).end('Method Not Allowed');//return 405 method not allowed to the client 
  }
} 