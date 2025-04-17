import React, { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userService'
import setAuthToken from './utils/setAuthToken'
import { addToCartAPI, getCartAPI, increaseCartQuantityAPI, decreaseCartQuantityAPI, removeCartAPI } from './services/cartService'

import { ToastContainer, toast } from 'react-toastify';
import UserContext from './contexts/userContext'
import CartContext from './contexts/CartContext'

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

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

  const addToCart = (product, quantity) => {
    let updatedCart = [...cart];

    //check if product already in the cart, if not found this function will return -1
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id);

    //if not found, then add product and quantity to cart
    if(productIndex === -1){
      updatedCart.push({product: product, quantity: quantity});
    } else{
      //only update quantity
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then(res => {
        toast.success("Product Added Successfully");
      })
      .catch(err => {
        toast.error("Failed to Add Product!");
      })
  }

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter(item => item.product._id !== id);
    setCart(newCart);

    removeCartAPI(id)
      .catch(err => {
        toast.error(err.message)
      } );
  }

  const updateCart = (type, id) => {
    const oldCart = [...cart];

    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if(type === 'increase') {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      increaseCartQuantityAPI(id)
        .catch(err => {
          toast.error(err.message);
          setCart(oldCart);
        });
    }
    if(type === 'decrease'){
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseCartQuantityAPI(id)
        .catch(err => {
          toast.error(err.message)
          setCart(oldCart);
        });
    }
  }

  const getCart = () => {
    getCartAPI()
      .then(res => {
        setCart(res.data)

      })
      .catch(err => {
        toast.error(`Can not get Cart Data from Backend | ${err.message}`);

      })
  }

  useEffect(() => {
    if(user){
      getCart();
    } else {
      setCart([])
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={ {cart , addToCart, removeFromCart, updateCart, setCart} }>
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