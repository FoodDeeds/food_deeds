import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { Form, Button } from "semantic-ui-react";

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
        <div>
            <Form style={{ marginLeft: 25, marginTop: 22 }}>
                <Form.Field
                    label="Email"
                    control="input"
                    onChange={(evt) => setEmail(evt.target.value)}
                    value={email}
                    style={{ width: 300 }}
                    placeholder="Email Address"
                />
                <Form.Field
                    label="Password"
                    control="input"
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                    style={{ width: 300 }}
                    placeholder="Password"
                    name="password"
                    type="password"
                />
                <Button
                    control="button"
                    onClick={login}
                    style={{ marginTop: 10, marginBottom: 30, width: 115 }}
                    size="small"
                    basic
                    color="green"
                >
                    LOGIN
                </Button>
                <br />
            </Form>

            <p style={{ marginLeft: 15 }}>Don't have an account?</p>
            <Link to="signup">
                <Button
                    basic
                    color="grey"
                    size="small"
                    style={{ marginLeft: 20 }}
                >
                    REGISTER HERE
                </Button>
            </Link>
        </div>
    );
};

export default LogIn;
