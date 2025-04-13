import React from 'react'

import './Pagination.css'

const Pagination = ({totalPosts, postsPerPage, onClickFunction, currentPage}) => {
 let pages = [];

 for(let i=1 ; i <= Math.ceil(totalPosts/postsPerPage) ; i++){
    pages.push(i);
 }

  return (
    <>
     {pages.length > 1 && <ul className='pagination'>
            {
                pages.map((page) => (
                    <li key={page}>
                        <button 
                        className={currentPage == page ? 'pagination_button active' : 'pagination_button'}
                        onClick={()=>onClickFunction(page)}
                        >{page}</button>
                    </li>
                )
            )}
        </ul>
    }
    </>
  )
}

export default Pagination