import React,{ useState} from 'react'
import {client , urlFor} from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar,AiOutlineStar } from 'react-icons/ai';
import{Product } from '../../components';
import {useStateContext} from '../../context/StateContext'
const ProductDetails = ({product,products}) => {

    const {name,details,price,image} = product;

    const [index,setIndex] = useState(0); //here we are setting the index to 0 so that the first image will be displayed
    const {decQty,incQty ,qty,onAdd,setShowCart} = useStateContext(); //here we are getting the values from the StateContext
    const handleBuyNow = () => {
        onAdd(product,qty); //here we are calling the onAdd function from the StateContext to add the product to the cart
        setShowCart(true);//show the cart when the user clicks on the buy now button
    }
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src= {urlFor(image && image[index])}
                     alt='product'
                     className='product-detail-image' 
                     />
                </div>
                <div className='small-images-container'>
                    {image?.map((item,i) => (
                        <img
                        key={i}
                          src={urlFor(item)} 
                          className = {i === index ? 'small-image selected-image' : 'small-image'}
                          onMouseEnter={() => setIndex(i)} 
                          alt='product' 
                          />
                    ))}
                </div>

            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />

                    </div>
                    <p>(20)
                    </p>

                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>
                    
                    ${price}
                </p>
                <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>

            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                {products.map((item) =>
                (
                    <Product key={item._id}
                    product={item}
                    />
                )
                )}
            </div>
        </div>
    </div>




</div>
  )
}
//getStaticPaths is used to get all
// the product slug from the database and
// store it in the paths array 
//works like cache for the products slug 
//to get the product instantly when the user visits the page
export const getStaticPaths = async () => {
    //this is the query to get all the products slug from the database
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;
    const products = await client.fetch(query); //fetch the products from the database
    const paths = products.map((product) => ({ //map the products to the paths array
        params:{
            slug:product.slug.current //get the slug of the product
        }
    }));
    return {
        paths, //return the paths array
        fallback:false //fallback blocking means

}
}


//getStaticProps is used to get data from sanity api instantly when the page is loaded
export const getStaticProps = async ({params:
{slug}}) => {
    const query = `*[_type == "product" && slug.current =='${slug}'][0]`; //this will fetch the first product 
    const product = await client.fetch(query);

    const productsQuery ='*[_type =="product"]'
    const products = await client.fetch(productsQuery);

   
    return {
      props: { products, product } //return the props object 
    }
  }
  

export default ProductDetails