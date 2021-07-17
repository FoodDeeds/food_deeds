import React, { useState, useEffect } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  toast.configure();
  const showToast = () => {
    toast("Your reservation is canceled", {
      position: "top-center",
      autoClose: 4000,
    });
  };
  const handleCancel = (donation) => {
    db.collection("Donations").doc(donation.id).set(
      {
        Status: true,
        recipientId: null,
      },
      { merge: true }
    );
    showToast();
  };
  const totalQty = function () {
    let total = 0;
    for (let i = 0; i < donations.length; i++) {
      let qty = donations[i].info.Quantity;
      total += Number.parseInt(qty);
    }
    return total;
  };

  return (
    <div style={{ marginLeft: 30, marginTop: 20 }}>
      <h3>Order History</h3>
      <p>You have rescued a total of {totalQty()} boxes of food. Way to go!</p>
      {donations.map((donation) => (
        <Segment className="result" key={donation.id} style={{ width: 350 }}>
          <Item.Group divided>
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

              {donation.info.Status === null ? (
                <p>This order was canceled by the supplier.</p>
              ) : (
                <Button
                  basic
                  onClick={() => {
                    handleCancel(donation);
                  }}
                  color="red"
                  style={{ width: 85, height: 35, marginRight: 20 }}
                >
                  Cancel
                </Button>
              )}
            </Item>
          </Item.Group>
        </Segment>
      ))}
    </div>
  );
};

export default OrderHistory;
