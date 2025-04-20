import React from 'react'

import './FeaturedProducts.css'
import ProductCard from '../Products/ProductCard'
import useData from '../../hooks/useData'
import ProductCardSkeleton from '../Products/ProductCardSkeleton'

const FeaturedProducts = () => {
  const {data, error, isLoading} = useData("/products/featured");

  return (
    <section className="featured_products">
        <h2>Featured Products</h2>
        {
          error && <em className='form_error'>{error}</em>
        }
        <div className="align_center featured_products_list">
        {
            isLoading ? <ProductCardSkeleton/> :
            data && data?.map((product, index) => 
              (
                <ProductCard key={index} product={product} />
              )
            )
        }
        </div>
    </section>
  )
}

export default FeaturedProducts
