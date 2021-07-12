import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";

const Confirmation = ({ location }) => {
  const supplierInfo = location.state.supplierInfo;
  const donation = location.state.donation;
  console.log("donation", donation);
  const history = useHistory();

  const handleClick = () => {
    console.log("clicked release");
  };

  return (
    <div>
      <h2> Pick-up Confirmed </h2>
      <p> Pick-up Date: {donation.info.PickupDate}</p>
      <p> Quantity:{donation.info.Quantity} boxes</p>
      <br />
      <p> Pick-up time: {donation.info.PickupTime}</p>
      <br />
      <p> Supplier Name: {donation.info.supplierName} </p>
      <p> Address: {donation.info.supplierAddress} </p>
      <p>
        {donation.info.supplierCity}
        {donation.info.supplierState},{donation.info.supplierZipCode}
      </p>
      {/* <p> Phone Number: {donation.Phone} </p> */}
      <br />

      <Button color="green" onClick={handleClick}>
        Release
      </Button>
    </div>
  );
};

export default Confirmation;
