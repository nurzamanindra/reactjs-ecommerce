import React from 'react'

import './CartPage.css'

import user from '../../assets/user.webp'
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'

import remove from '../../assets/remove.png'

const CartPage = () => {
  return (
    <section className='align_center cart_page'>
        <div className="align_center user_info">
            <img src={user} alt="user profile" />
        </div>

        <p className="user_name">Harley Davidson</p>
        <p className="user_email">harley.davidson@gmail.com</p>

        {/* Cart Table to show user order */}
        <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
            <tbody>
                <tr>
                    <td>iPhone 14</td>
                    <td>$999</td>
                    <td className='align_center table_quantity_input'
                    ><QuantityInput/></td>
                    <td>$999</td>
                    <td>
                        <img className='cart_remove_icon' src={remove} alt="remove icon" />
                    </td>
                </tr>
                <tr>
                    <td>iPhone 14</td>
                    <td>$999</td>
                    <td className='align_center table_quantity_input'
                    ><QuantityInput/></td>
                    <td>$999</td>
                    <td>
                        <img className='cart_remove_icon' src={remove} alt="remove icon" />
                    </td>                
                </tr>
                <tr>
                    <td>iPhone 14</td>
                    <td>$999</td>
                    <td className='align_center table_quantity_input'
                    ><QuantityInput/></td>
                    <td>$999</td>
                    <td>
                        <img className='cart_remove_icon' src={remove} alt="remove icon" />
                    </td>                
                </tr>
            </tbody>
        </Table>

        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>$9999</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>$1004</td>
                </tr>
            </tbody>
        </table>

        <button className="search_button checkout_button">Checkout</button>
    </section>
  )
}

export default CartPage