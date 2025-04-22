//action object
// {
//     type: "type-string",
//     payload: {

//     }
// }

const cartReducer = (cart, action) => {

    switch(action.type){
        case "ADD_TO_CART":
            let updatedCart = [...cart];
            const {product, quantity} = action.payload;
            
            //check if product already in the cart, if not found this function will return -1
            const productIndex = updatedCart.findIndex(item => item.product._id === product._id);
        
            //if not found, then add product and quantity to cart
            if(productIndex === -1){
            updatedCart.push({product: product, quantity: quantity});
            } else{
            //only update quantity
            updatedCart[productIndex].quantity += quantity;
            }
        
            return updatedCart;
        
        case "GET_CART":
            return action.payload.products;

        case "REVERT_CART":
            return action.payload.cart;
        
        case "REMOVE_FROM_CART":
            const oldCart = [...cart];
            const newCart = oldCart.filter(item => item.product._id !== action.payload.id);
            return newCart;
    }


}


export default cartReducer;