import React, { useState, useEffect } from "react";
import { Button, Item } from "semantic-ui-react";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { green, lightGreen } from "@material-ui/core/colors";

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

  const handleCancel = (donation) => {
    toast.configure();
    const notify = () => {
      toast("This donation has been cancelled.");
    };
    notify();
    db.collection("Donations").doc(donation.id).set(
      {
        Status: null,
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
      <h3>Giving History</h3>
      <p>You have donated a total of {totalQty()} boxes of food. Way to go!</p>
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
              {donation.info.Status === null ? (
                <Button
                  basic
                  color="green"
                  style={{ width: 100, height: 30, marginRight: 20 }}
                >
                  Cancelled
                </Button>
              ) : (
                <div>
                  <Button
                    basic
                    color="green"
                    style={{ width: 100, height: 30, marginRight: 20 }}
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    // onClick={() => {
                    //   if (
                    //     window.confirm("Are you sure you want to delete this?")
                    //   )
                    //     handleDelete(donation);
                    // }}
                    onClick={() => handleCancel(donation)}
                    color="green"
                    style={{ width: 100, height: 30, marginRight: 20 }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Item>
          </Item.Group>
        </div>
      ))}
    </div>
  );
};

export default GivingHistory;
