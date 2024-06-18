

import { FiSearch } from "react-icons/fi";
import { MdOutlinePerson } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import {apiValue} from '../Api/ApiFood'
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './Header.css'
import img from '../../../assets/img.png'
const Header = () => {



    return (
        <div className='Nav'>
            <div className='Nav-main'>
                <div className='Nav-logo' style={{margin:"1.5% 0px"}}>
                  <h2><img src={img} alt="" className='imgggg' /></h2>  
                </div>
                <div className='Nav-cat' style={{display:"flex"}}>
                    <Link to='/' > <button style={{color:"gray"}}>Home</button></Link>
                    <Link to='dashboard' > <button style={{color:"gray"}}>Customer</button></Link>

                </div>
                
                <div className='Nav-cart'>
                    <Link to={'/profile'}>  <h2><MdOutlinePerson className='icons' />  </h2></Link>

                </div>
                

                {/* <FaRegUser /> */}
            </div>
            {/* <Outlet/> */}

        </div>
    )
}

export default Header