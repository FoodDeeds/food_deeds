import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";

const Confirmation = ({location}) => {
  const supplierInfo = location.state.supplierInfo;
  const donations = location.state.donations;
  console.log("donations", donations)
  const history = useHistory();

  const handleClick = () => {
    console.log("clicked release");
  };

  return (
    <div>
      <h2> Pickup Confirmed </h2>
      <ul> palceholder</ul>
      <ul> {donations.Quantity}</ul>
      <br />
      <ul> Pick up time:</ul>
      <ul> Donation.PickupTime </ul>
      <br />
      <ul> {supplierInfo.Name} </ul>
      <ul> {supplierInfo.Address} </ul>
      <ul>
        {supplierInfo.City}
        {supplierInfo.State},
        {supplierInfo.Zipcode}
      </ul>
      <ul> {supplierInfo.Phone} </ul>
      <br />

      <Button color="green" onClick={handleClick}>Release</Button>
    </div>
  );
};

export default Confirmation;
