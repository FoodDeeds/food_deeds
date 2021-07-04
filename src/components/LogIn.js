import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

const LogIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setError("");
                props.history.push('/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="form">
            <form onSubmit={login}>
                <ul className="form__container">
                    <li>
                        <h2>Sign In</h2>
                    </li>
                    <li>
                        {error && <span className="error__msg">{error}</span>}
                    </li>
                    <li>
                        <label htmlFor="username">Username:</label>
                        <input name="username" type="text" />
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" />
                    </li>
                    <li>
                        <button type="submit" className="primary__btn">
                            Login
                        </button>
                    </li>
                    <li>New to Food Deeds?</li>
                    <li>
                        <Link to="/signup">
                            <button className="secondary__btn">
                                Create New Account
                            </button>
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default LogIn;
