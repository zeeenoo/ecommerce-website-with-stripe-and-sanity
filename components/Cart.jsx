import React,{useRef} from 'react'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';


 const Cart = () => {
  const cartRef = useRef(); // useRef is a hook that lets you store a reference to a DOM node in a React component. 
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();// useStateContext is a hook that lets you access the state and dispatch methods of the StateContext.
const handleCheckout = async () => {
  const stripe = await getStripe();
  const response = await fetch('/api/stripe', { //here we do an api request to our own next js backend to get the stripe public key
      method: 'POST', //this is the method that we are using to make the request to the backend
      headers: {
        'Content-Type': 'application/json', // we are sending a json object to the backend so we need to set the content type header to application/json
      },
      body: JSON.stringify(cartItems), // we send the cartItems to the backend to get the stripe public key


  });
  if(response.statusCode ===500)  return; // if the response status code is 500 then we return because there was an error
  const data= await response.json(); // we get the stripe public key from the backend and store it in the data variable
  toast.loading('redirecting ...'); // we show a loading message to the user  and we set the color to red
  stripe.redirectToCheckout({sessionId:data.id}) // we redirect the user to the stripe checkout page
}
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
        type='button'
        className='cart-heading'
        onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>{totalQuantities} items</span>

        </button>
        {
          cartItems.length <1 &&(
            <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>

          )
        }

     
<div className='product-container'>
        {cartItems.length>=1 && cartItems.map((item) => (
          <div className='product' key={item._id}>
            <img src={urlFor(item?.image[0])} alt={item.title}
            className='cart-product-image'/>
            <div className='item-desc'>
              <div className='flex top'>
                <h5>
                  {item.title}
                </h5>
                <h4>
                  ${item.price}
                </h4>

              </div>
              <div className='flex bottom'>
                <div>
                <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                </div>
                <button
                type='button'
                className='remove-item'
                onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline />
                </button>


            </div>
            </div>

          </div>
          
        ))}
</div>
{cartItems.length>=1 && (
  <div className='cart-bottom'>
    <div className='total'>
      <h3>Subtotal</h3>
      <h3>${totalPrice}</h3>
    </div>
    <div className="btn-container">
      <button type='button' className='btn' onClick= {handleCheckout}>
        Pay with Stripe
      </button>
</div>
    </div>

)
}
</div>
    </div>
  )
}
export default Cart;
