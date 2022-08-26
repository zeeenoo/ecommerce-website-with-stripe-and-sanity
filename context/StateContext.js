import { createContext ,useContext ,useState,useEffect } from "react";
import {toast} from 'react-hot-toast';

const Context = createContext();
export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false); //to show the cart when the user clicks on the cart icon 
    const [cartItems, setCartItems] = useState([]);//here we are storing the cart items in the cartItems array 
    const [totalPrice, setTotalPrice] = useState(0);//to store the total price of the cart items
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);//to show the checkout page when the user clicks on the checkout button
    let foundProduct;//to check if the product is already in the cart
    let index;
    const onAdd = (product,quantity) =>{
        const checkProductInCart = cartItems.find((item) => item._id === product._id);//check if the product is already in the cart
        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price*quantity);//if the product is already in the cart then add the price of the product to the total price
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);//add the quantity of the product to the total quantities
       
if(checkProductInCart) {
    const updatedCartItems = cartItems.map((cartProduct) => {//update the cart items array
        if(cartProduct._id === product._id) return{
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,

        }
        return cartProduct;
    } );
setCartItems(updatedCartItems);
//set the cart items array to the updated cart items array


}
else{
    product.quantity = quantity;//set the quantity of the product to the quantity of the product
    setCartItems([...cartItems,{ ...product}]);//add the product to the cart items array
}
toast.success(`${qty} ${product.title} added to cart`);
    }

    const onRemove = (product) => { //to remove the product from the cart
        foundProduct = cartItems.find((item) => item._id === product._id);//find the product in the cart items array
        const newCartItems = cartItems.filter((item) => item._id !== product._id); //filter the cart items array to remove the product 
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity); //subtract the price of the product from the total price
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity); //subtract the quantity of the product from the total quantities
        setCartItems(newCartItems); //set the cart items array to the new cart items array
      }
    
const toggleCartItemQuantity = (id,value) =>{ //to toggle the quantity of the product in the cart
   foundProduct = cartItems.find((item) => item._id ===id);//find the product in the cart
   index=  cartItems.findIndex((product) => product._id ===id);//find the index of the product in the cart
   const newCartItems = cartItems.filter((item) => item._id !== id) ;//filter the cart items array to remove the product from the cart
if(value==='inc'){ //if the value is inc then increase the quantity of the product in the cart
    setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
    //increase the quantity of the product in the cart
    setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);//increase the total price of the product in the cart
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);//increase the total quantities of the product in the cart


}else if (value==='dec'){ //decrease the quantity of the product in the cart
    if(foundProduct.quantity>1){
        setCartItems([...newCartItems,{ ...foundProduct,quantity:foundProduct.quantity-1}]);//decrease the quantity of the product in the cart
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);//decrease the total price of the product in the cart
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);//decrease the total quantities of the product in the cart
     }

}

}  

const incQty = () => { //
    setQty((prevQty) => prevQty + 1);
}
const decQty =() => {
    setQty((prevQty) => {
        if(prevQty -1 < 1) return 1;

    return    prevQty -1;
}
    );
}


    return (
        <Context.Provider
 value={{showCart, cartItems,  totalPrice,  totalQuantities,  qty,
 incQty,decQty,onAdd ,setShowCart,
  toggleCartItemQuantity,setCartItems,
  setTotalPrice,setTotalQuantities,onRemove}}>
    {children}
</Context.Provider>
    )

}
export const useStateContext = () => useContext(Context);
