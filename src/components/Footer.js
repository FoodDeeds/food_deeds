import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react'

import { auth } from "../firebase";
/**
 * Login + Sign up buttons
 * after logged in, show "Hello, Username"
 */
export const Footer = () => {
    const history = useHistory();

    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                console.log("Logged out");
            }
        });
    }, []);

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push("/login");
        });
    };

    // console.log(currentUser)

    return (
        <>
            <div className="footer__view">
                {currentUser && (
                    <div className="login__user">
                        <p>Welcome back, {currentUser.email}</p>
                        <br />
                        <Button color ="green" className="logout__btn" onClick={handleLogout}>
                            LOG OUT
                        </Button>
                    </div>
                )}
                {!currentUser && (
                    <div className="log__btn">
                        <Link to="/login">
                            <Button color="green">LOG IN</Button>
                        </Link>

                        <Link to="/signup">
                            <Button color="green">SIGN UP</Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Footer;


