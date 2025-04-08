import React from 'react'
import LinkWithIcon from './LinkWithIcon'

import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='align_center navbar'>
        <div className='align_center'>
            <h1 className="navbar_heading">E-Commerce</h1>
            <form className="align_center navbar_form">
                <input type="text" className="navbar_search" placeholder='Search Products' />
                <button type='submit' className="search_button">Search</button>
            </form>

        </div>
        <div className="align_center navbar_links">
            <LinkWithIcon title="Home" link="/" emoji={rocket} />
            <LinkWithIcon title="Products" link="/products" emoji={star} />
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            
            <a href="/cart" className='align_center'>
                Cart <p className='align_center cart_counts'>0</p>
            </a>
        </div>
    </nav>
  )
}

export default Navbar