import React, { useState } from "react";
import "./styles/Home.css";
import { Link } from "react-scroll";

const Navbar = () => {
  const navlist = ["Home", "About", "Portfolio", "Contact"];
  const [menu, setMenu] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = (index) => {
    setMenu(false);
    setActiveIndex(index);
  };

  return (
    <div className="navbar">
      <div className="nav">
        <span className="name">Budumuru Rohith Kumar</span>
        <div className="menu" onClick={handleMenu}>
          |||
        </div>
        <ul className={`components ${menu ? "show" : "hide"}`}>
          {navlist.map((item, index) => (
            <Link
              to={item}
              className="link"
              smooth={true}
              key={index}
              onClick={() => closeMenu(index)}
            >
              <li className={`item ${activeIndex === index ? "active" : ""}`}>
                {item}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
