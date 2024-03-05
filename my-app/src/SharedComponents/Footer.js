import React from "react";
import "../SharedCSS/Footer.css";
import logoImage from "../images/kauSupportLogo.png";

/*
  <div>
          <img src={logoImage} alt="" className="logo-image-footer"/>
        </div>

 <div className="link-of-interset">
          <h5>Link of Interset</h5>
          <hr className="line-style"></hr>
          <ul>
            <li><a href="https://www.kau.edu.sa/"  target="_blank" rel="noopener noreferrer">University Website</a></li>
            <li><a href="https://www.kau.edu.sa/Content-0-AR-285326"  target="_blank" rel="noopener noreferrer">E-Services</a></li>
          </ul>
          </div>
          <div className="contact-kau">
          <h5>Contact KAU</h5>
          <hr className="line-style-2"></hr>
          <ul>
            <li>Free Call: 8001169528</li>
            <li>Email: cic@kau.edu.sa</li>
          </ul>
          </div>
        <div className="copy">
        <p>&copy; All Rights reserved King Abdulaziz University 2024
        </p>
        
        </div>



*/

function Footer() {
  return (
    
      <footer>
        <div className="footer-items-container">
          <div className="footer-left-part">
          <div className="footer-headers">
          <span >Link of Interset</span>

          </div>

        
           <a className="website" href="https://www.kau.edu.sa/"  target="_blank" rel="noopener noreferrer">University Website</a>
          <a  className="e-services" href="https://www.kau.edu.sa/Content-0-AR-285326"  target="_blank" rel="noopener noreferrer">E-Services</a>
          <a className="call-left-part">Contact KAU: 8001169528</a>


          
          
       

          </div>
          <div className="footer-middle-part">
          <img src={logoImage} alt="" className="logo-image-footer"/>
          <p>&copy; All Rights reserved King Abdulaziz University 2024  </p>

       
            
         
          </div>
          <div className="footer-right-part">
          <div className="footer-headers">
          <span >Contact KAU</span>

          </div>
          
         
          <span className="call-right-part">Free Call: 8001169528</span>
       
          </div>
        </div>
      
       
      </footer>
    
  )
}

export default Footer;