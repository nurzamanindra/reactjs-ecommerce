import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard'

import './ProductsList.css'
import ProductCardSkeleton from './ProductCardSkeleton'
import { useSearchParams } from 'react-router-dom'
import useProductList from '../../hooks/useProductList'

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");

  const searchQuery = search.get("search");

  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

//===========for page scroll==========
  // const [page, setPage] = useState(1);
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
//===========for page scroll==========

//===========for pagination==========
//   const page = search.get("page");
//===========for pagination==========


  const {data, error, fetchNextPage, hasNextPage, isFetching} = useProductList(
    {
      search : searchQuery,
      category,
      perPage: 4
    }
  );

// console.log("data",data);

//======for page scroll================

  // useEffect(() => {
  //   // setPage(1);
  //   window.scrollTo(0, 0, 10);
  // }, [searchQuery, category]);


  useEffect(()=> {
    const handleScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
      
        if(scrollTop + clientHeight >= scrollHeight - 1 && !isFetching && hasNextPage && data 
          // && page < data.totalPages
        ){
            setCurrentScrollPos(scrollTop)
            console.log("reach to bottom");
            // setPage(prev => prev + 1)
            fetchNextPage();
        }

    }  

    window.addEventListener("scroll", handleScroll);
    return () =>  window.removeEventListener("scroll", handleScroll);
  }
  , [data]);

  useEffect(()=>{
    window.scrollTo(0, parseInt(currentScrollPos + 25, 10));
  } , [data, isFetching])

  useEffect(() => {
    if(data && data.pages){
      // const products = [...data.products];
      const products = data.pages.flatMap(page => page.products) 

      // console.log("products",products);

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
                isFetching ? <ProductCardSkeleton/> :
                data && sortedProducts.map((product, index) => 
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