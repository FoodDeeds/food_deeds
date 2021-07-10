import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase";

const Signup = (props) => {
  // need to add more fields
  const [type, setType] = useState("Supplier");
  const [category, setCategory] = useState("Grocery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const signup = (evt) => {
    evt.preventDefault();
    // console.log("sigup Form submmitted");
    // console.log(name, email, password, error);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        db.collection("SignedUpUsers")
          .doc(userCred.user.uid)
          .set({
            // need more fields
            id: userCred.user.uid,
            Type: type,
            Category: category,
            Name: name,
            Phone: phone,
            Email: email,
            Password: password,
            Address: address,
            Zipcode: zipcode,
            City: city,
            State: state,
          })
          .then(() => {
            // after stored in db, empty fields and redirect to login
            setType("");
            setCategory("");
            setName("");
            setPhone("");
            setEmail("");
            setPassword("");
            setAddress("");
            setCity("");
            setZipcode("");
            setState("");
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
        <label htmlFor="type">Type</label>
        <select
          name="type"
          value={type}
          onChange={(evt) => setType(evt.target.value)}
        >
          <option value="supplier">Supplier</option>
          <option value="recipient">Recipient</option>
        </select>
        <br />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={category}
          onChange={(evt) => setCategory(evt.target.value)}
        >
          <option value="Grocery">Grocery Store</option>
          <option value="Deli">Deli</option>
          <option value="Cafe">Cafe</option>
        </select>
        <br />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form__text"
          required
          onChange={(evt) => setName(evt.target.value)}
          value={name}
        />
        <br />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          className="form__text"
          required
          value={phone}
          onChange={(evt) => setPhone(evt.target.value)}
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
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form__text"
          required
          value={address}
          onChange={(evt) => setAddress(evt.target.value)}
        />
        <br />
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form__text"
          required
          value={city}
          onChange={(evt) => setCity(evt.target.value)}
        />
        <br />
        <label htmlFor="zipcode">Zip Code</label>
        <input
          type="text"
          className="form__text"
          required
          value={zipcode}
          onChange={(evt) => setZipcode(evt.target.value)}
        />
        <br />
        <label htmlFor="state">State</label>
        <input
          type="text"
          className="form__text"
          required
          value={state}
          onChange={(evt) => setState(evt.target.value)}
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

// need to add database snapshot to listen to updates
// ex: if a document is directly deleted in database and an email no longer exists
//   --> sign up form does not get notified, site still thinks the email exists

// password hash function?
