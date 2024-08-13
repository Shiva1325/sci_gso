import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "../Styles/navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };
  const location = useLocation();
  const [scrollActive, setScrollActive] = useState(location.pathname != '/'?true:false);
  const changeNavbarBackground = () => {
    if(location.pathname == '/'){
        if(window.scrollY >= 610) {
          setScrollActive(true);
        }
        else{
          setScrollActive(false);
        }
    }
    else{
        setScrollActive(true);
    }
  }
  useEffect(() => {
    changeNavbarBackground();
  }, [location.pathname])
  window.addEventListener('scroll', changeNavbarBackground);
  return (
    <header className={scrollActive? "header-navbar active": "header-navbar"}>
      <nav className="nav container">
        {/* <NavLink to="/" className="nav__logo">
          Navigation Bar
        </NavLink> */}

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/about"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                About
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/events"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Events
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/gallery"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Gallery
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/faqs"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                FAQs
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/contact" className="nav__link nav__cta">
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;