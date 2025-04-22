import React, { useEffect, useState, useCallback, useReducer } from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userService'
import setAuthToken from './utils/setAuthToken'
import { addToCartAPI, getCartAPI, increaseCartQuantityAPI, decreaseCartQuantityAPI, removeCartAPI } from './services/cartService'

import { ToastContainer, toast } from 'react-toastify';
import UserContext from './contexts/UserContext'
import CartContext from './contexts/CartContext'
import cartReducer from './reducers/cartReducer'

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  useEffect(()=> {

    try {
      const jwtUser = getUser();

      //cek if jwt token is expired
      if(Date.now() >= jwtUser.exp * 1000) {
        
        localStorage.removeItem("token")
        location.reload();

      } else{
        setUser(jwtUser);
      }

    } catch (error) {
      //do nothing
    }
  }
  , []);

  const addToCart = useCallback((product, quantity) => {
    // let updatedCart = [...cart];

    // //check if product already in the cart, if not found this function will return -1
    // const productIndex = updatedCart.findIndex(item => item.product._id === product._id);

    // //if not found, then add product and quantity to cart
    // if(productIndex === -1){
    //   updatedCart.push({product: product, quantity: quantity});
    // } else{
    //   //only update quantity
    //   updatedCart[productIndex].quantity += quantity;
    // }
    // setCart(updatedCart);

    dispatchCart({
      type: "ADD_TO_CART",
      payload: {
        product, 
        quantity
      }
    });

    addToCartAPI(product._id, quantity)
      .then(res => {
        toast.success("Product Added Successfully");
      })
      .catch(err => {
        toast.error("Failed to Add Product!");
        
        dispatchCart({
          type: "REVERT_CART",
          payload: {
            cart
          }
        })

      })
  }, [cart])

  const removeFromCart = useCallback((id) => {
    // const oldCart = [...cart];
    // const newCart = oldCart.filter(item => item.product._id !== id);
    // setCart(newCart);
    dispatchCart({
      type: "REMOVE_FROM_CART",
      payload: {
        id
      }
    })
    removeCartAPI(id)
      .catch(err => {
        toast.error(err.message)
        dispatchCart({
          type: "REVERT_CART",
          payload: {
            cart
          }
        })
      } );
  }, [cart])

  const updateCart = useCallback((type, id) => {

    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if(type === 'increase') {
      updatedCart[productIndex].quantity += 1;
      // setCart(updatedCart);
      dispatchCart({
        type: "GET_CART",
        payload: {
          products : updatedCart
        }
      })
      increaseCartQuantityAPI(id)
        .catch(err => {
          toast.error(err.message);
          dispatchCart({
            type: "REVERT_CART",
            payload: {
              cart
            }
          })
        });
    }
    if(type === 'decrease'){
      updatedCart[productIndex].quantity -= 1;
      // setCart(updatedCart);
      dispatchCart({
        type: "GET_CART",
        payload: {
          products : updatedCart
        }
      })
      decreaseCartQuantityAPI(id)
        .catch(err => {
          toast.error(err.message)
          dispatchCart({
            type: "REVERT_CART",
            payload: {
              cart
            }
          })
        });
    }
  }, [cart])

  const getCart = useCallback(() => {
    getCartAPI()
      .then(res => {
        // setCart(res.data)
        dispatchCart({
          type: "GET_CART",
          payload: {
            products : res.data
          }
        })

      })
      .catch(err => {
        toast.error(`Can not get Cart Data from Backend | ${err.message}`);

      })
  }, [user])

  useEffect(() => {
    if(user){
      getCart();
    } else {
      // setCart([])
      dispatchCart({
        type: "GET_CART",
        payload: {
          products : []
        }
      })
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{
        cart, 
        addToCart,
        removeFromCart, 
        updateCart,
        dispatchCart 
        // setCart
        }}>
        <div className='app'>
          <Navbar/>
          <main>
            <ToastContainer
              position="top-center"
              closeOnClick
            />
            <Routing/>
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App