import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <>
      <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <img style={{borderRadius:'30px'}} src={assets.logo} alt="" />
                 <p>Your trusted partner for seamless and efficient asset management solutions.</p>
                 <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                 <h2>Company</h2>
                 <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                 </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>-1-212-456-7890</li>
                    <li>contact@Assetease.com</li>
                </ul>
            </div>
        </div>
        <p className='footer-copyright'>Copyright 2024 Assetease.com - All Rights are reserved</p>
      </div>
    </>
  )
}

export default Footer