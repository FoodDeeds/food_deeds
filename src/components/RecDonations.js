import React, { useState, useEffect } from "react";
import { auth, db, messaging } from "../firebase";
import { Button, Item, Header, Segment } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import post from "../images/post-default.png";

const RecDonations = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [donations, setDonations] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState({});
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    db.collection("Donations")
      .where("Status", "==", true)
      .limit(5)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, []);
  // useEffect(() => {
  //   messaging
  //     .requestPermission()
  //     .then(() => {
  //       return messaging.getToken();
  //     })
  //     .then((data) => {
  //       console.warn("token", data);
  //     });
  // });
  toast.configure();
  const showToast = () => {
    toast("Please log in to reserve!", {
      position: "top-center",
      autoClose: 4000,
    });
  };

  const handleClick = (donation) => {
    if (currentUser) {
      setDonations(donation);
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
    } else {
      showToast();
    }
  };

  return (
    <div>
      <Header>Currently Available For Pick-Up</Header>
      {donations.map((donation) => (
        <Segment className="result" key={donation.id}>
          <Item.Group divided style={{ marginLeft: 30 }}>
            <Item>
              <br />
              {donation.info.postImageUrl ? (
                <Item.Image
                  src={donation.info.postImageUrl}
                  alt=""
                  style={{ marginRight: 70, marginTop: 10 }}
                />
              ) : (
                <Item.Image
                  src={post}
                  alt=""
                  style={{ marginRight: 70, marginTop: 10 }}
                />
              )}
              <br />
              <Item.Content style={{}}>
                <Link to={`/supplier/${donation.info.supplierId}`}>
                  <Item.Header as="a">{donation.info.supplierName}</Item.Header>
                </Link>
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
                {/* removed city state zipcode from form, data needs to come from somewhere else */}
                {/* {donation.info.City}, {donation.info.State}
                        {donation.info.PostalCode} */}
                <br />
              </Item.Content>
              <Button
                basic
                color="green"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 20,
                }}
                onClick={() => handleClick(donation)}
              >
                Reserve
              </Button>
            </Item>
          </Item.Group>
        </Segment>
      ))}
    </div>
  );
};

export default RecDonations;
