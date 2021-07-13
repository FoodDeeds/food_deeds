import React, { useState, useEffect } from "react";
import { Button, Item } from "semantic-ui-react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

const Reserved = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [donations, setDonations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    db.collection("SignedUpUsers")
      .doc(currentUser.uid)
      .get()
      .then((response) => {
        const data = response.data();
        setUserInfo(data);
      });
    if (userInfo.Type === "Recipient") {
      db.collection("Donations")
        .where("recipientId", "==", `${currentUser.uid}`)
        .onSnapshot((snapshot) => {
          setDonations(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              info: doc.data(),
            }))
          );
        });
    } else {
      db.collection("Donations")
        .where("supplierId", "==", `${currentUser.uid}`)
        .onSnapshot((snapshot) => {
          setDonations(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              info: doc.data(),
            }))
          );
        });
    }
  }, [userInfo.Type]);

  const handleCancel = (donation) => {
    db.collection("Donations").doc(donation.id).set(
      {
        Status: true,
        recipientId: null,
      },
      { merge: true }
    );
  };

  return (
    <div>
      {donations.length > 0 && userInfo.Type === "Recipient" ? (
        <h3>Order History</h3>
      ) : null}

      {donations.length > 0 && userInfo.Type === "Supplier" ? (
        <h3>Giving History</h3>
      ) : null}

      {donations.map((donation) => (
        <div className="result" key={donation.id}>
          <Item.Group divided style={{ marginLeft: 30 }}>
            <Item>
              <br />
              <Item.Content>
                <Item.Header as="a">{donation.info.supplierName}</Item.Header>
                <Item.Meta>
                  Last Available Pick Up Time: <br />
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

export default Reserved;
