import { React, useState } from 'react'

import './SingleProductPage.css'
import QuantityInput from './QuantityInput';

const product = {
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
    "id": 1,
    "images": [
        "https://placehold.co/500?text=Product+Image+1 ",
        "https://placehold.co/500?text=Product+Image+2 ",
        "https://placehold.co/500?text=Product+Image+3 ",
        "https://placehold.co/500?text=Product+Image+4 "
    ],
    "price": 9.99,
    "stock": 10,
    "title": "Product Title"
}

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className='align_center single_product'>
      <div className="align_center">
          <div className="single_product_thumbnails">
             {
                product.images.map((image, index) => <img
                key={index}
                src={image}
                alt={product.title}
                onClick={()=>setSelectedImage(index)}
                  className={selectedImage === index ? "selected_image" : ""}
              />)
            }
          </div>
          <img src={product.images[selectedImage]} alt={product.title} className='single_product_display'/>
      </div>
        

        <div className="single_product_details">
          <h1 className="single_product_title">{product.title}</h1>
          <p className="single_product_description">{product.description}</p>
          <p className="single_product_price">{product.price.toFixed(2)}</p>

          <h2 className="quantity_title">Quantity:</h2>
          <div className="align_center quantity_input">
            <QuantityInput/>
          </div>

          <button className="search_button add_cart">Add to Cart</button>
        </div>
    </section>
  )
}

export default SingleProductPage