import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const PostDonation = (props) => {
  console.log(props);
  const [userInfo, setUserInfo] = useState({});
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const newDonation = {
    Description: description,
    Image: image,
    Quantity: quantity,
    PickupDate: pickupDate,
    PickupTime: pickupTime,
    Address: address,
    City: city,
    State: state,
    PostalCode: postalCode,
    Status: true,
    PostingTime: new Date(),
    supplierId: userInfo.uid,
  };

  const submit = (evt) => {
    evt.preventDefault();
    db.collection("Donations")
      .add(newDonation)
      .then(() => {
        setDescription("");
        setImage("");
        setQuantity("");
        setPickupDate("");
        setPickupTime("");
        setAddress("");
        setCity("");
        setState("");
        setPostalCode("");
        props.history.push("/account");
      })
      .catch((err) => console.log("Something went wrong", err));
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo({});
        console.log("Logged out.");
      }
    });
  });

  return (
    <div className="form">
      <h2>Post a donation</h2>
      <form onSubmit={submit}>
        <label htmlFor="description">Description</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
        />
        <br />
        <label htmlFor="image">Image</label>
        <input
          className="form__text"
          onChange={(evt) => setImage(evt.target.value)}
          value={image}
        />
        <br />
        <label htmlFor="quantity">Quantity</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setQuantity(evt.target.value)}
          value={quantity}
        />
        <h4>Please enter pickup information:</h4>
        <br />
        <label htmlFor="pickupDate">Date</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setPickupDate(evt.target.value)}
          value={pickupDate}
        />
        <br />
        <label htmlFor="pickupTime">Time</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setPickupTime(evt.target.value)}
          value={pickupTime}
        />
        <br />
        <label htmlFor="address">Address</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setAddress(evt.target.value)}
          value={address}
        />
        <br />
        <label htmlFor="city">City</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setCity(evt.target.value)}
          value={city}
        />
        <br />
        <label htmlFor="state">State</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setState(evt.target.value)}
          value={state}
        />
        <br />
        <label htmlFor="postalCode">Zip Code</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setPostalCode(evt.target.value)}
          value={postalCode}
        />
        <br />
        <button>Submit</button>
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default PostDonation;
