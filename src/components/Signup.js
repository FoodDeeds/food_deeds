import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase";

const Signup = (props) => {
    // need to add more fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCred) => {
                db.collection("SignedUpUsers")
                    .doc(userCred.user.uid)
                    .set({
                        // need more fields
                        Name: name,
                        Email: email,
                        Password: password
                    })
                    .then(() => {
                        setName("");
                        setEmail("");
                        setPassword("");
                        setError("");
                        props.history.push("/login");
                    })
                    .catch((err) => setError(err.message));
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="form">
            <form onSubmit={signup} name={name}>
                <ul className="form__container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>
                        {error && <span className="error__msg">{error}</span>}
                    </li>
                    <li>
                        <label htmlFor="name">Organization name:</label>
                        <input name="username" type="text" />
                    </li>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="email" />
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" />
                    </li>
                    <li>
                        <label htmlFor="address">Address:</label>
                        <textarea name="address" type="text" />
                    </li>
                    <li>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input name="phoneNumber" type="text" />
                    </li>
                    <li>
                        <button type="submit" className="primary__btn">
                            Register
                        </button>
                    </li>
                    <li>Already have an Account?</li>
                    <li>
                        <Link to="/login">
                            <button className="secondary__btn">Log In</button>
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default Signup;
