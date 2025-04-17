import React from 'react'
import './QuantityInput.css'


const QuantityInput = ({quantity, setQuantity, stock, cartPage, productId}) => {
 
  return (
    <>
        <button className="quantity_input_button" 
        disabled={quantity <= 0 || stock == 0}
        onClick={()=> {cartPage ? setQuantity("decrease", productId) : setQuantity(quantity - 1)}} >-</button>

        <p className="quantity_input_count">{quantity}</p>

        <button className="quantity_input_button"
         disabled={quantity >= stock || stock == 0}
         onClick={()=>{cartPage ? setQuantity("increase", productId) : setQuantity(quantity + 1)}}  >+</button>
    </>
  )
}

export default QuantityInput