import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

const LogIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = (evt) => {
        evt.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // after logged in, empty fields, redirect to home page
                setEmail("");
                setPassword("");
                setError("");
                props.history.push("/");
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="form">
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete="off" className="form__group" onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form__text"
                    required
                    onChange={(evt) => setEmail(evt.target.value)}
                    value={email}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form__text"
                    required
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                />
                <br />
                <button type="submit" className="primary__btn">
                    LOGIN
                </button>
            </form>
            {error && <span className="error__msg">{error}</span>}
            <br />
            <span>
                Don't have an account?
                <Link to="signup">
                    <button className="secondary__btn">REGISTER</button>
                </Link>
            </span>
        </div>
    );
};

export default LogIn;
