import React, { useState, useEffect } from "react";
import MapSearch from "./MapSearch";
import { db } from "../firebase";

const Browse = (props) => {
  const [category, setCategory] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [donations, setDonations] = useState([]);

  const submit = (evt) => {
    evt.preventDefault();
    db.collection("Donations")
      //   .where("PostalCode", "==", zipcode)
      //   .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
        console.log(snapshot.docs);
      });
  };

  return (
    <div className="browse">
      <form onSubmit={submit}>
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          required
          onChange={(evt) => setZipcode(evt.target.value)}
        />
        <select
          name="category"
          onChange={(evt) => setCategory(evt.target.value)}
        >
          <option value="All">All</option>
          <option value="Grocery">Grocery Store</option>
          <option value="Deli">Deli</option>
          <option value="Cafe">Cafe</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <br />
      <MapSearch />
      <div className="search-results">
        <h3>Showing results:</h3>
        {donations.map((donation) => (
          <div className="result">
            <p>
              {donation.info.Address} <br />
              {donation.info.City}, {donation.info.State}{" "}
              {donation.info.PostalCode}
              <br />
              Pickup Time: {donation.info.PickupTime} <br />
              Pickup Date: {donation.info.PickupDate} <br />
              Quantity: {donation.info.Quantity} boxes
              <br />
              <button>Reserve</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
