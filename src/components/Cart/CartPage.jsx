import React, { useContext, useMemo, memo } from 'react'

import './CartPage.css'

import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'

import remove from '../../assets/remove.png'
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext'
import { checkoutAPI } from '../../services/orderService'
import { toast } from 'react-toastify'

const CartPage = () => {

  const user = useContext(UserContext);
  const {cart, removeFromCart, updateCart, setCart} = useContext(CartContext);

  const checkout = async () => {
    try {
        await checkoutAPI();
        toast.success("Success placed Order");
        setCart([]);
    } catch (err) {
        toast.error("can not placed Order");
    }
  }

  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach(item => {
        total += item.product.price * item.quantity;
    });

    return total;
  }
  , [cart]);


  return (
    <section className='align_center cart_page'>
        <div className='cart_user_header'>
            <div className="align_center user_info">
                <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="user profile" />
            </div>
            <div className='cart_user_header_details'>
                <p className="user_name">Name: {user?.name}</p>
                <p className="user_email">Email: {user?.email}</p>
            </div>
        </div>
        {/* Cart Table to show user order */}
        <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
            <tbody>
                {
                cart && cart.map( ({product, quantity}) => 
                <tr key={product?._id}>
                    <td>{product?.title}</td>
                    <td>${product?.price}</td>
                    <td className='align_center table_quantity_input'>
                        <QuantityInput 
                        quantity={quantity} 
                        stock={product?.stock}
                        setQuantity={updateCart}
                        cartPage={true}
                        productId={product?._id}
                        />
                    </td>
                    <td>${quantity*product?.price}</td>
                    <td>
                        <img className='cart_remove_icon' src={remove} alt="remove icon" onClick={()=> removeFromCart(product?._id)}/>
                    </td>
                </tr>
                    )
                }
                
            </tbody>
        </Table>

        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>${subTotal}</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>${subTotal + 5}</td>
                </tr>
            </tbody>
        </table>

        <button className="search_button checkout_button" onClick={() => checkout()}>Checkout</button>
    </section>
  )
}

export default memo(CartPage)