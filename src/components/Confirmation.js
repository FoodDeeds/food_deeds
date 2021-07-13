import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { db, auth } from "../firebase";

const Confirmation = ({ location }) => {
  const supplierInfo = location.state.supplierInfo;
  const donation = location.state.donation;
  const [release, setRelease] = useState(true);

  const [currentUser, setCurrentUser] = useState({});

  console.log("donation", donation);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const handleRelease = () => {
    console.log("clicked release");
    setRelease(false);
    db.collection("Donations").doc(donation.id).set(
      {
        Status: true,
        recipientId: null,
      },
      { merge: true }
    );
  };

  const handleReserve = () => {
    setRelease(true);
    db.collection("Donations").doc(donation.id).set(
      {
        Status: false,
        recipientId: currentUser.uid,
      },
      {
        merge: true,
      }
    );
  };

  return (
    <div>
      {release === true ? (
        <h2> Pick-up Confirmed </h2>
      ) : (
        <h2>Order Cancelled</h2>
      )}
      <p> Pick-up Date: {donation.info.PickupDate}</p>
      <p> Quantity:{donation.info.Quantity} boxes</p>
      <br />
      <p> Pick-up time: {donation.info.PickupTime}</p>
      <br />
      <p> Supplier Name: {donation.info.supplierName} </p>
      <p> Address: {donation.info.supplierAddress} </p>
      <p>
        {donation.info.supplierCity}
        {donation.info.supplierState},{donation.info.supplierZipcode}
      </p>
      {/* <p> Phone Number: {supplierInfo.Phone} </p> */}
      <br />
      {release === true ? (
        <Button color="red" onClick={handleRelease}>
          Release
        </Button>
      ) : (
        <Button color="green" onClick={handleReserve}>
          Reserve
        </Button>
      )}
      <br />
      <br />
      <a href="/account">
        <Button color="green">Go to My Account</Button>
      </a>
    </div>
  );
};

export default Confirmation;
