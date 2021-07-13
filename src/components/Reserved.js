import React, { useState, useEffect } from "react";
import { Button, Item } from "semantic-ui-react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

const Reserved = () => {
  const [userInfo, setUserInfo] = useState({});
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState({});
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserInfo(user)
      }
    })
  }, [])

  useEffect(() => {
    db.collection("Donations")
    .where("Status", "==", false)
    .where("recipientId", "==", `${userInfo.uid}`)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, [userInfo.uid]);

  console.log('[donations] ', donations)
  console.log('[userinfo] ', userInfo.uid)

  const handleClick = (donation) => {
    console.log('clicked canceled')
    setSelectedDonation(donation);
    console.log('donation clicked', donation.info.supplierName)
  };

  return (
    <div>
      <h3>Currently Reserved Donations</h3>
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
                onClick={() => handleClick(donation)}
                color="green"
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

}


export default Reserved;
