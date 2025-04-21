import { React, useContext, useState, memo } from 'react'

import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import ProductCardSkeleton from '../Products/ProductCardSkeleton';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const {id} = useParams();
  const [quantity, setQuantity] = useState(0);
  const {data : product, error, isLoading} = useData(`/products/${id}`);

  const {cart, addToCart} = useContext(CartContext);
  const user = useContext(UserContext);

  return (
    <section className='align_center single_product'>
      {error && <em className="form_error">{error}</em>}
      {isLoading && <ProductCardSkeleton/>}
      {product && 
      <>
        <div className="align_center">
            <div className="single_product_thumbnails">
              {
                  product.images?.map((image, index) => <img
                  key={index}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  onClick={()=>setSelectedImage(index)}
                    className={selectedImage === index ? "selected_image" : ""}
                />)
              }
            </div>
            <img src={`http://localhost:5000/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display'/>
        </div>
          

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            
            {user && <>       
                <h2 className="quantity_title">Quantity:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                </div>
                {product?.stock == 0 && 
                <div>
                  <em className='stock_quantity'>Stock is unavailable</em>
                </div>}

                <button 
                disabled={quantity == 0 ? true : false} 
                className={quantity == 0 ? "search_button add_cart button_disabled" : "search_button add_cart" } 
                onClick={()=>addToCart(product, quantity)}>Add to Cart</button>
            </>}
          </div>
        </>
        }
    </section>
  )
}

export default memo(SingleProductPage)