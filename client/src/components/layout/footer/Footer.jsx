import React from 'react'
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import './Footer.css'
import logo from '../../../assets/img.png'
const Footer = () => {
  return (
    <div>
        <div className='footer'>
            <div className='container1'>
                <div className='about'>
                    <div className='logo' style={{ width: "100px"}}>
                        <img  src={logo} alt="" style={{ width: "100px"}}/>
                        {/* <h1 className='logo-head'> Tasteee</h1> */}
                    </div>
                    <div className='detail1'>
                        <p>"I saw a bank that said '24 Hour Banking', but I don't have that much time.
                       "</p>
                        
                    </div>
                </div>
                <div className='accounts'>
                <h3>ContactUs</h3>
                <ul>
                    <li>Help&Support</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Servicet</li>


                </ul>
            </div>
   
            <div className='detail1'>
                        <h4 className='follow'>Follow Us,</h4>
                        <div className='icon1'>                       
                        <li><BiLogoFacebook/></li>
                        <li><FaInstagram/></li>
                        <li><FaTwitter/></li>
                        <li><FaYoutube/></li>
                        </div>
                    </div>
            </div>
            
        </div>

    </div>
  )
}

export default Footer