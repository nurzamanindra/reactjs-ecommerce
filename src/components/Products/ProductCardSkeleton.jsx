import React from 'react'
import { BounceLoader, ClimbingBoxLoader, GridLoader } from 'react-spinners'

const ProductCardSkeleton = () => {
    const mystyle = {
       display: "flex",
       alignItems: "center",
       justifyContent:"center",
       height:"65vh",
       width: "100%",
       padding:"0"
      };
  return (
    <div style={mystyle}>
        <GridLoader size={40} color="#6457f9"/>
    </div>
  )
};

export default ProductCardSkeleton;