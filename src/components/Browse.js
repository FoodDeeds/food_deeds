import React, { useState, useEffect } from "react";
import MapSearch from "./MapSearch";
import { db } from "../firebase";
import { Button, Dropdown, Form, Header, Segment } from "semantic-ui-react";

const Browse = (props) => {
  const [category, setCategory] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [donations, setDonations] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState({});

  const submit = (evt) => {
    evt.preventDefault();
    db.collection("Donations")
      .where("PostalCode", "==", zipcode)
      // .orderBy("Timestamp", "desc")
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  };
  const options = [
    { key: 1, text: "All", value: "All" },
    { key: 2, text: "Grocery", value: "Grocery" },
    { key: 3, text: "Deli", value: "Deli" },
    { key: 4, text: "Cafe", value: "Cafe" },
  ];
  console.log(donations);
  return (
    <div className="browse">
      <Header style={{ marginBottom: -70, marginTop: 40 }}>
        Search Available Food by Zip Code and Category:
      </Header>
      <Form onSubmit={submit}>
        <Form.Group width="equal">
          <input
            type="text"
            required
            onChange={(evt) => setZipcode(evt.target.value)}
            placeholder="Zip Code"
            style={{
              width: 200,
              marginLeft: 10,
              marginTop: 100,
            }}
          />
          <Dropdown
            clearable
            options={options}
            selection
            placeholder="Category"
            onChange={(evt) => setCategory(evt.target.value)}
            style={{
              marginLeft: 10,
              marginTop: 100,
            }}
          />
          <Button
            type="submit"
            basic
            color="green"
            style={{ width: 85, marginLeft: 20, marginTop: 100 }}
          >
            Search
          </Button>
        </Form.Group>
      </Form>
      <br />
      <MapSearch donations={donations} />
      <div className="search-results">
        <Header style={{ marginTop: 20 }}>Showing results:</Header>
        {donations.map((donation) => (
          <Segment className="result" key={donation.id} style={{ width: 300 }}>
            <p>
              {donation.info.Address} <br />
              {donation.info.City}, {donation.info.State}{" "}
              {donation.info.PostalCode}
              <br />
              Pickup Time: {donation.info.PickupTime} <br />
              Pickup Date: {donation.info.PickupDate} <br />
              Quantity: {donation.info.Quantity} boxes
              <br />
              <Button basic color="green" style={{ marginTop: 10 }}>
                Reserve
              </Button>
            </p>
          </Segment>
        ))}
      </div>
    </div>
  );
};

export default Browse;
