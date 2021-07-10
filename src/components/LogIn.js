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
    auth
      .signInWithEmailAndPassword(email, password)
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
      <Form>

          <Form.Field
            label="Email"
            control="input"
            onSubmit={login}
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
            style={{ width: 300 }}
          />
          <Form.Field
            label="Password"
            control="input"
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
            style={{ width: 300 }}
          />
          <Button
            control="button"
            onClick={login}
            style={{marginTop: 10, marginBottom: 30, width: 115}}
            size="small"
            basic color="green"
          >
            LOGIN
          </Button>
          <br/>
      </Form>

      <p>Don't have an account?</p>
      <Link to="signup">
        <Button
        basic color="grey"
        size="small"
        >
            REGISTER HERE
        </Button>
      </Link>
    </div>
  );
};

export default LogIn;

// <br />
// <h2>Login</h2>
// <br />
// <form autoComplete="off" className="form__group" onSubmit={login}>
//   <label htmlFor="email">Email</label>
//   <input
//     type="email"
//     className="form__text"
//     required
//     onChange={(evt) => setEmail(evt.target.value)}
//     value={email}
//   />
//   <br />
//   <label htmlFor="password">Password</label>
//   <input
//     type="password"
//     className="form__text"
//     required
//     onChange={(evt) => setPassword(evt.target.value)}
//     value={password}
//   />
//   <br />
//   <button type="submit" className="primary__btn">
//     LOGIN
//   </button>
// </form>
// {error && <span className="error__msg">{error}</span>}
// <br />
// <span>
//   Don't have an account?
//   <Link to="signup">
//     <button className="secondary__btn">REGISTER</button>
//   </Link>
// </span>
