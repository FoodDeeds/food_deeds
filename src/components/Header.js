import React, { useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import "./Header.css";
import { SidebarItems } from "./SidebarItems";

// sidebar(slide) + FOOD DEEDS only
const Header = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <MenuIcon onClick={showSidebar} />
                </Link>
                <h1>FOOD DEEDS</h1>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <CloseIcon />
                        </Link>
                    </li>
                    {SidebarItems.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Header;
