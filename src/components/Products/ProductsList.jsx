import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard'

import './ProductsList.css'
import useData from '../../hooks/useData'
import ProductCardSkeleton from './ProductCardSkeleton'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../Common/Pagination'

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");

  const searchQuery = search.get("search");

  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

//===========for page scroll==========
  const [page, setPage] = useState(1);
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
//===========for page scroll==========

//===========for pagination==========
//   const page = search.get("page");
//===========for pagination==========


  const {data, error, isLoading} = useData("/products", {
    params: {
        search : searchQuery,
        category,
        page
    }
  }, [searchQuery, category, page]);



//======for page scroll================

  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0, 10);
  }, [searchQuery, category]);

  useEffect(()=> {
    const handleScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        // console.log("Scroll Top", scrollTop);
        // console.log("Client Height", clientHeight);
        // console.log("Scroll Height", scrollHeight);
        // console.log("scrollTop + ClientHeight = ", parseFloat(scrollTop) + parseFloat(clientHeight));
        if(scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data && page < data.totalPages){
            setCurrentScrollPos(scrollTop)
            console.log("reach to bottom");
            setPage(prev => prev + 1)
        }

    }  

    window.addEventListener("scroll", handleScroll);
    return () =>  window.removeEventListener("scroll", handleScroll);
  }
  , [data, isLoading]);

  useEffect(()=>{
    window.scrollTo(0, parseInt(currentScrollPos + 25, 10));
  } , [data, isLoading])

  useEffect(() => {
    if(data && data.products){
      const products = [...data.products];
      
      if(sortBy === "price desc") {
        setSortedProducts(products.sort((a, b)=> b.price - a.price));

      } else if(sortBy === "price asc") {
        setSortedProducts(products.sort((a, b)=> a.price - b.price));
    
      } else if(sortBy === "rate desc") {
        setSortedProducts(products.sort((a, b)=> b.reviews.rate - a.reviews.rate));

      } else if(sortBy === "rate asc") {
        setSortedProducts(products.sort((a, b)=> a.reviews.rate - b.reviews.rate));

      } else {
        setSortedProducts(products);
      }
    }
  }
    ,[sortBy, data]);
//======for page scroll================


//======for pagination================

//   const handlePageChange = (page) => {
//     const currentParams = Object.fromEntries([...search]);
//     setSearch({...currentParams, page : page})
//   }
//======for pagination================

  return (
    <section className='product_list_section'>
        <header className="align_center product_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className="product_sorting"
            onChange={e => setSortBy(e.target.value)}>
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate desc">Rate HIGH to LOW</option>
                <option value="rate asc">Rate LOW to HIGH</option>

            </select>
        </header>

        <div className="product_list">
            {
                error && <em className='form_error'>{error}</em>
            }

            {
                isLoading ? <ProductCardSkeleton/> :
                data?.products && sortedProducts.map((product, index) => 
                    (<ProductCard key={index}
                        product={product}
                    />)
                )
            }
        </div>
        {/* 
        //======for pagination================
        { data &&
            <Pagination 
            totalPosts = {data?.totalProducts} 
            postsPerPage = {data?.postPerPage} 
            onClickFunction={handlePageChange}
            currentPage={page}/>
        } 
        //======for pagination================
         */}
    </section>
)
}

export default ProductsList