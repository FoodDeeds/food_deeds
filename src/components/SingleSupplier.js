import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import { Header, Item, Segment } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import logo from "../images/Logo-2.png";

const SingleSupplier = (props) => {
  const [supplierInfo, setSupplierInfo] = useState({});
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
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
      .doc(props.match.params.id)
      .get()
      .then((response) => {
        const data = response.data();
        setSupplierInfo(data);
      });
    db.collection("Donations")
      .where("supplierId", "==", props.match.params.id)
      .where("Status", "==", true)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, [props.match.params.id]);

  const handleClick = (donation) => {
    setConfirmation(true);
    setSelectedDonation(donation);
    db.collection("Donations").doc(donation.id).set(
      {
        Status: false,
        recipientId: currentUser.uid,
      },
      { merge: true }
    );
    history.push({
      pathname: "/confirmation",
      state: {
        donation,
        supplierInfo,
      },
    });
  };

  return (
    <div
      style={{
        marginTop: "1%",
        paddingRight: "1%",
        paddingLeft: "1%",
      }}
    >
      <div className="supplier-logo">
        {supplierInfo.Image ? (
          <Item.Image
            src={supplierInfo.Image}
            alt=""
            style={{ marginRight: 20, marginTop: 10 }}
          />
        ) : (
          <Item.Image
            src={logo}
            alt=""
            style={{ marginRight: 20, marginTop: 10 }}
          />
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        <h2>{supplierInfo.Name}</h2>
        <p>
          {supplierInfo.Address}
          <br />
          {supplierInfo.City}, {supplierInfo.State}, {supplierInfo.Zipcode}
        </p>
        <p>{supplierInfo.Phone}</p>
      </div>
      <div>
        <Header size="medium" style={{ marginTop: 10, marginRight: -10 }}>
          Available Donations
        </Header>
        {donations.map((donation) => (
          <Segment style={{ width: 250, height: 150 }}>
            <Item.Description>
              Pickup Time: {donation.info.PickupTime} <br />
              Pickup Date: {donation.info.PickupDate} <br />
              Quantity: {donation.info.Quantity} boxes <br />
            </Item.Description>
            <Button
              basic
              color="green"
              style={{ marginTop: 20 }}
              onClick={() => handleClick(donation)}
              alt=""
            >
              Reserve
            </Button>
          </Segment>
        ))}
      </div>
    </div>
  );
};

export default SingleSupplier;
