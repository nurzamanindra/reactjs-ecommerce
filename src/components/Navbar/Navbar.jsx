import React, { useContext, useState, useEffect } from 'react'
import LinkWithIcon from './LinkWithIcon'

import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'

import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext'
import { getSuggestionsAPI } from '../../services/productService'

const Navbar = () => {
 const user = useContext(UserContext);
 const {cart} = useContext(CartContext);
 
 const [search, setSearch] = useState("");
 const navigate = useNavigate();

 const [suggestions, setSuggestions] = useState([]);
 const [selectedItem, setSelectedItem] = useState(-1);

 const handleSubmit = (e) => {
    e.preventDefault();
    if(search.trim() != "") {
        //navigate to /product?search="string-search"
        navigate(`/products?search=${search.trim()}`);
    }

    setSuggestions([]);
 }

 const handleKeyDown = e => {
    const keyPressed = e.key;
    const suggestionLength = suggestions.length > 0 ? suggestions.length : 1;
    if(selectedItem > -1){
        if(keyPressed === "ArrowDown") {
            setSelectedItem(prev => (prev + 1) % suggestionLength)
        }
        else if (keyPressed === "ArrowUp"){
            setSelectedItem(prev => (prev - 1) % suggestionLength)
        }
        else if(keyPressed === "Enter") {
            setSuggestions([])
            if(suggestionLength > 0) {
                //navigate to /product?search="string-search"
                const currentItemTitle = suggestions[selectedItem].title;
            
                setSearch(currentItemTitle);
                navigate(`/products?search=${search.trim()}`);
                setSearch("");
            }

        }

    } else {
        setSelectedItem(suggestionLength);
    }
 }

 useEffect(() => {

    const delaySuggestion = setTimeout(() => {
        if(search.trim() != "") {
            getSuggestionsAPI(search)
                .then(res => {
                    setSuggestions(res.data);
                })
                .catch(err => {console.log(err.message)});    
                setSuggestions([]);
        } else {
            setSuggestions([]);
        }
    }, 300);
    return () => {
        clearTimeout(delaySuggestion);
    } 
}

, [search]);

 return (
    <nav className='align_center navbar'>
        {suggestions.length > 0 && <div onClick={()=>{
            setSearch("");
            setSuggestions([])}
            } 
            className='click_anywhere'></div>
        }
        <div className='align_center'>
            <h1 className="navbar_heading">E-Commerce</h1>

            <form className="align_center navbar_form" onSubmit={handleSubmit}>
                <input type="text" className="navbar_search" placeholder='Search Products' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <button type='submit' className="search_button">Search</button>

                {suggestions.length > 0 && <ul className='search_result'>
                    {
                       suggestions.map((suggestion, index) =>  
                       <li key={suggestion._id} className={`search_suggestion_link ${index === selectedItem ? "active_suggestion" : ""}`} 
                       onClick={()=> {
                            setSearch("");
                            setSuggestions([]);
                        }}>
                            <Link to={`/products?search=${suggestion.title}`}>{suggestion.title}</Link>
                        </li>
                       )
                    }
                </ul>}
            </form>

        </div>
        <div className="align_center navbar_links">
            <LinkWithIcon title="Home" link="/" emoji={rocket} />
            <LinkWithIcon title="Products" link="/products" emoji={star} />
            
            {!user && 
            <>
                <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
                <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
            </>}

           { user && 
            <>
                <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
                <LinkWithIcon title="Logout" link="/logout" emoji={lock} />  
                <NavLink to="/cart" className='align_center'>
                    Cart <p className='align_center cart_counts'>{cart.length}</p>
                </NavLink>
            </>}
        </div>
    </nav>
  )
}

export default Navbar