import React, { useState, useEffect } from "react";
import { Button, Item } from "semantic-ui-react";
import { db } from "../firebase";

const OrderHistory = (props) => {
  const [donations, setDonations] = useState([]);
  const userInfo = props.userInfo;

  useEffect(() => {
    db.collection("Donations")
      .where("recipientId", "==", `${userInfo.id}`)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, [userInfo.id]);

  const handleCancel = (donation) => {
    db.collection("Donations").doc(donation.id).set(
      {
        Status: true,
        recipientId: null,
      },
      { merge: true }
    );
  };
  const totalQty = function () {
    let total = 0;
    for (let i = 0; i < donations.length; i++) {
      let qty = donations[i].info.Quantity;
      console.log(qty);
      total += Number.parseInt(qty);
    }
    return total;
  };
  return (
    <div>
      <h3>Order History</h3>
      <p>You have rescued a total of {totalQty()} boxes of food. Way to go!</p>
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
                onClick={() => {
                  if (window.confirm("Are you sure you want to cancel?"))
                    handleCancel(donation);
                }}
                color="red"
                style={{ width: 100, height: 30, marginRight: 20 }}
              >
                Cancel
              </Button>
            </Item>
          </Item.Group>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
