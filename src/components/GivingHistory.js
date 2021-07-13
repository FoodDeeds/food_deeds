import React, { useState, useEffect } from "react";
import { Button, Item } from "semantic-ui-react";
import { db } from "../firebase";

const GivingHistory = (props) => {
  const userInfo = props.userInfo;
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    db.collection("Donations")
      .where("supplierId", "==", `${userInfo.id}`)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, [userInfo.id]);

  return (
    <div>
      <h3>Giving History</h3>
      {donations.map((donation) => (
        <div className="result" key={donation.id}>
          <Item.Group divided style={{ marginLeft: 30 }}>
            <Item>
              <br />
              <Item.Content>
                <Item.Header as="a">{donation.info.supplierName}</Item.Header>
                <Item.Meta>
                  Pick Up Time: <br />
                  {donation.info.PickupTime} on {donation.info.PickupDate}{" "}
                  <br />
                </Item.Meta>
                Quantity: {donation.info.Quantity} boxes
                <Item.Description>
                  {" "}
                  Description: {donation.info.Description}
                </Item.Description>
                <br />
              </Item.Content>

              <Button
                basic
                color="green"
                style={{ width: 100, height: 30, marginRight: 20 }}
              >
                Edit
              </Button>
            </Item>
          </Item.Group>
        </div>
      ))}
    </div>
  );
};

export default GivingHistory;
