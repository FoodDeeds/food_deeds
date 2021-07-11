import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Button, Item, } from 'semantic-ui-react'

/**
 * user's icon, name
 * post's image
 * firebase: Description & Quantity
 * Pass them as props by PostDonation (parent)
 */

const RecDonations = () => {
  const [donations, setDonations] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState({});

  useEffect(() => {
    db.collection("Donations")
      // .where("PostalCode", "==", zipcode)
      // .orderBy("Timestamp", "desc")
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });

    donations.forEach((donation) => {
      db.collection("SignedUpUsers")
        .doc(donation.info.supplierId)
        .get()
        .then((response) => {
          const data = response.data();
          setSupplierInfo(data);
        });
    });
  }, []);
  // console.log("supplier info data>>>>>", supplierInfo);

  console.log("Donations!!!", donations);
  return (
    <div>
      <h3>Currently Available For Pick-Up</h3>
      {donations.map((donation) => (
        <div className="result" key={donation.id}>
          <Item.Group divided style={{marginLeft: 30}}>
          <Item >
            <br/>
            <Item.Image src={donation.info.postImageUrl} alt="" style={{marginRight: 20, marginTop: 10}}/>
            <br />
            <Item.Content>
            <Item.Header as="a">{donation.info.supplierName}</ Item.Header>
            <Item.Meta>
              Last Available Pick Up Time: <br />
              {donation.info.PickupTime} on {donation.info.PickupDate} <br />
            </Item.Meta>
              Quantity: {donation.info.Quantity} boxes
            <Item.Description> Description: {donation.info.Description}</Item.Description>
            {/* removed city state zipcode from form, data needs to come from somewhere else */}
            {/* {donation.info.City}, {donation.info.State}
                        {donation.info.PostalCode} */}
            <br />
            </Item.Content>
            <Button basic color="green" style={{width: 100, height: 30, marginRight: 20}}>Reserve</Button>
            </Item>
          </Item.Group>
        </div>
      ))}
    </div>
  );
};

export default RecDonations;
