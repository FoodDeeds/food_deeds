import React, { Component } from "react";
import { Link } from "react-router-dom";

// sidebar(slide) + FOOD DEEDS only
export class Header extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/">FOOD DEEDS</Link>
            </div>
        );
    }
}

export default Header;
