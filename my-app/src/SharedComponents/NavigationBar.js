import React, { useState } from "react";
import "../SharedCSS/FmNavigationBar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ServicesContext } from "../App";
import logoImage from "../images/kauSupportLogo.png";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa"; // FaBars for the menu icon
import { LoginContext } from "../App";
function NavigationBar({ setSearch , placeholderValue ,showSearchBar}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { services } = useContext(ServicesContext);
  const [isAvatarClicked, setisAvatarClicked] = useState(false);
  const [
    userID,
    setUserID,
    userPass,
    setuserPass,
    isLoggedIn,
    setIsLoggedIn,
    setUserRole,
    userRole,
  ] = useContext(LoginContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handelLogout(){
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('userID'); 
    localStorage.removeItem('userRole'); 
    setUserID("") ; 
    setuserPass("") ; 
    setUserRole("") ;
    setIsLoggedIn(false) ;


    navigate("/") ;

  }

  return (
    <div>
      <div className="fm-nav-bar">
        <div className="fm-nav-bar-container">
          <div onClick={()=> {navigate("/Home")}}>
            <img className="logo-image" src={logoImage} alt="" />
          </div>

          <div className="fm-nav-left">
            <FaBars className="hamburger-icon" onClick={toggleMenu} />
            <div className={`menu-items ${isMenuOpen ? "active" : ""}`}>
              {services.map((service) => (
                <span
                  onClick={() => navigate(service.pageLink)}
                  className="fm-nav-items"
                  key={service.serviceName}
                >
                  {service.serviceName}
                </span>
              ))}
            </div>
          </div>
          <div className="fm-nav-right">
            {showSearchBar !== "No" ?(<>
             <input
              type="text"
              className="fm-serach-bar"
              placeholder={placeholderValue}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            /></>) : (<></>)}
         
            <FaRegUserCircle onClick={()=>{setisAvatarClicked(true)}} className="react-icons-user-icon" /> 


           
            {isAvatarClicked && (
  <>
    <div onClick={() => { setisAvatarClicked(false) }} className="list-close-icon">x</div>
    <div className="avatar-list">
      <ul>
        
        <li onClick={handelLogout}>
         Logout
        </li>
       
      </ul>
    </div>
  </>
)}

           
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="overlay">
          <div className="fm-menu-close-icon" onClick={toggleMenu}>
            x
          </div>
          {services.map((service) => (
            <span
              className="fm-nav-items-overlay"
              key={service.serviceName}
              onClick={() => navigate(service.pageLink)}
            >
              {service.serviceName}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
