import React, { useState } from "react";
import "../SharedCSS/FmNavigationBar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ServicesContext } from "../App";
import logoImage from "../images/kauSupportLogo.png";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa"; // FaBars for the menu icon
import { Link } from "react-router-dom";
function NavigationBar({ setSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { services } = useContext(ServicesContext);


  const navigate = useNavigate();

 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="fm-nav-bar">
        <div className="fm-nav-bar-container">
          <div>
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
            <input
              type="text"
              className="fm-serach-bar"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <FaRegUserCircle className="react-icons-user-icon" />
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
