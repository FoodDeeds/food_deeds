import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

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
            <button className="logout__btn" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        )}
        {!currentUser && (
          <div className="log__btn">
            <Link to="/login">
              <button>LOG IN</button>
            </Link>

            <Link to="/signup">
              <button>SIGN UP</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;
