import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils'; //import the fireworks function from the lib folder 

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext(); //get the setCartItems and setTotalPrice from the StateContext hook 
  
  useEffect(() => { //useEffect hook to set the cartItems and totalPrice to 0 after the page has been rendered
    localStorage.clear(); //clear the localStorage
    setCartItems([]); //set the cartItems to an empty array
    setTotalPrice(0); //set the totalPrice to 0
    setTotalQuantities(0);//set the totalQuantities to 0
    runFireworks(); // THIS function is in the lib folder and it will run the fireworks animation when the page is rendered
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success