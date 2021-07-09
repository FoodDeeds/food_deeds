import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const Confirmation = (props) => {
  const [donationInfo, setDonationInfo] = useState({});

  const handleClick = () => {
    console.log("clicked release");
  };

  return (
    <div>
      <h2> Pickup Confirmed </h2>
      <ul> Donation.PickupDate </ul>
      <ul> Donation.Quantity</ul>
      <br />
      <ul> Pick up time:</ul>
      <ul> Donation.PickupTime </ul>
      <br />
      <ul> Supplier.Name </ul>
      <ul> Supplier.Address </ul>
      <ul> Supplier.City, Supplier.State, Supplier.Zipcode </ul>
      <ul> Supplier.Phone </ul>
      <br />

      <Button color="green" onClick={handleClick}>Release</Button>
    </div>
  );
};

export default Confirmation;
