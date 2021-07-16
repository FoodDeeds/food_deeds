import React, { useState, useEffect } from "react";
import MapSearch from "./MapSearch";
import { Button, Dropdown, Form, Header, Segment } from "semantic-ui-react";
import { auth, db } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Browse = () => {
  const [supplierInfo, setSupplierInfo] = useState({});
  const [category, setCategory] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [allDonations, setAllDonations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    db.collection("Donations")
      .where("Status", "==", true)
      .onSnapshot((snapshot) => {
        setAllDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    db.collection("Donations")
      .where("supplierZipCode", "==", zipcode)
      .where("Status", "==", true)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, [zipcode]);
  toast.configure();
  const showToast = () => {
    toast("Please log in to reserve!", {
      position: "top-center",
      autoClose: 4000,
    });
  };
  const handleClick = (donation) => {
    if (currentUser) {
      setSelectedDonation(donation);
      db.collection("Donations").doc(donation.id).set(
        {
          Status: false,
          recipientId: currentUser.uid,
        },
        { merge: true }
      );
      history.push({
        pathname: "/confirmation",
        state: {
          donation,
          supplierInfo,
        },
      });
    } else {
      showToast();
    }
  };

  const submit = (evt) => {
    evt.preventDefault();
    if (!category || category === "All") {
      db.collection("Donations")
        .where("supplierZipCode", "==", zipcode)
        // .orderBy("Timestamp", "desc")
        .onSnapshot((snapshot) => {
          setDonations(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              info: doc.data(),
            }))
          );
        });
    } else {
      db.collection("Donations")
        .where("supplierZipCode", "==", zipcode)
        .where("supplierCategory", "==", category)
        // .orderBy("Timestamp", "desc")
        .onSnapshot((snapshot) => {
          setDonations(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              info: doc.data(),
            }))
          );
        });
    }
  };

  const handleCategory = async (evt, category) => {
    setCategory(category.value);
  };
  const options = [
    { key: 1, text: "All", value: "All" },
    { key: 2, text: "Grocery Store", value: "Grocery Store" },
    { key: 3, text: "Deli", value: "Deli" },
    { key: 4, text: "Cafe", value: "Cafe" },
  ];

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
            onChange={handleCategory}
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
      <MapSearch
        donations={donations}
        allDonations={allDonations}
        zipcode={zipcode}
      />
      <div className="search-results">
        {donations.length > 0 ? (
          <Header style={{ marginTop: 20 }}>Showing results:</Header>
        ) : null}

        {zipcode !== ""
          ? donations.map((donation) => (
              <Segment
                className="result"
                key={donation.id}
                style={{ width: 300 }}
              >
                <p>
                  <Link to={`/supplier/${donation.info.supplierId}`}>
                    {donation.info.supplierName}
                  </Link>
                  <br />
                  {donation.info.supplierAddress} <br />
                  {donation.info.supplierCity}, {donation.info.supplierState}{" "}
                  {donation.info.supplierZipCode}
                  <br />
                  Pickup Time: {donation.info.PickupTime} <br />
                  Pickup Date: {donation.info.PickupDate} <br />
                  Quantity: {donation.info.Quantity} boxes
                  <br />
                  <Button
                    basic
                    color="green"
                    style={{ marginTop: 10 }}
                    onClick={() => handleClick(donation)}
                  >
                    Reserve
                  </Button>
                </p>
              </Segment>
            ))
          : allDonations.map((allDonation) => (
              <Segment
                className="result"
                key={allDonation.id}
                style={{ width: 300 }}
              >
                <p>
                  <Link to={`/supplier/${allDonation.info.supplierId}`}>
                    {allDonation.info.supplierName}
                  </Link>
                  <br />
                  {allDonation.info.supplierAddress} <br />
                  {allDonation.info.supplierCity},{" "}
                  {allDonation.info.supplierState}{" "}
                  {allDonation.info.supplierZipCode}
                  <br />
                  Pickup Time: {allDonation.info.PickupTime} <br />
                  Pickup Date: {allDonation.info.PickupDate} <br />
                  Quantity: {allDonation.info.Quantity} boxes
                  <br />
                  <Button
                    basic
                    color="green"
                    style={{ marginTop: 10 }}
                    onClick={() => handleClick(allDonation)}
                  >
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
