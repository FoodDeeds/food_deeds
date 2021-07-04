import React, { Component } from "react";
import { Link } from "react-router-dom";
/**
 * Login + Sign up buttons
 * after logged in, show "Hello, Username"
 */
export class Footer extends Component {
    render() {
        return (
            <div className="footer__view">
                <Link to="/login">
                    <button>LOG IN</button>
                </Link>

                <Link to="/signup">
                    <button>SIGN UP</button>
                </Link>
            </div>
        );
    }
}

export default Footer;
