import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase";

const Signup = (props) => {
    // need to add more fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signup = (evt) => {
        evt.preventDefault();
        // console.log("sigup Form submmitted");
        // console.log(name, email, password, error);
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
                        // after stored in db, empty fields and redirect to login
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
            <br />
            <h2>Sign up</h2>
            <br />
            <form autoComplete="off" className="form__group" onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form__text"
                    required
                    onChange={(evt) => setName(evt.target.value)}
                    value={name}
                />
                <br />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form__text"
                    required
                    onChange={(evt) => setEmail(evt.target.value)}
                    value={email}
                />
                <br />
                <label htmlFor="passowrd">Password</label>
                <input
                    type="password"
                    className="form__text"
                    required
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                />
                <br />
                <button type="submit" className="primary__btn">
                    REGISTER
                </button>
            </form>
            {error && <span className="error__msg">{error}</span>}
            <br />
            <span>
                Already have an account?
                <Link to="login">
                    <button className="secondary__btn">LOG IN</button>
                </Link>
            </span>
        </div>
    );
};

export default Signup;
