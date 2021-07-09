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
      <p> Supplier Name: {supplierInfo.Name} </p>
      <p> Address: {supplierInfo.Address} </p>
      <p>
        {supplierInfo.City}
        {supplierInfo.State},{supplierInfo.Zipcode}
      </p>
      <p> Phone Number: {supplierInfo.Phone} </p>
      <br />

      <Button color="green" onClick={handleClick}>
        Release
      </Button>
    </div>
  );
};

export default Confirmation;
