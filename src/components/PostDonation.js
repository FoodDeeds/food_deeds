import React, { useState } from "react";

const PostDonation = (props) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const status = true;

  const submit = (evt) => {
    evt.preventDefault();
  };

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
          required
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
        <br />
        <label htmlFor="pickupDate">Pickup Date</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setPickupDate(evt.target.value)}
          value={pickupDate}
        />
        <br />
        <label htmlFor="pickupTime">Pickup Time</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setPickupTime(evt.target.value)}
          value={pickupTime}
        />
        <br />
        <label htmlFor="pickupLocation">Pickup Location</label>
        <input
          className="form__text"
          required
          onChange={(evt) => setPickupLocation(evt.target.value)}
          value={pickupLocation}
        />
        <br />
        <button>Submit</button>
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default PostDonation;
