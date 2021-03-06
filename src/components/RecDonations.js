import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  Button,
  Item,
  Header,
  Segment,
  Loader,
  Dimmer,
  Image,
} from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import post from "../images/post-default.png";

const RecDonations = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [donations, setDonations] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        db.collection("SignedUpUsers")
          .doc(user.uid)
          .get()
          .then((response) => {
            const data = response.data();
            setUserInfo(data);
          });
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
        setLoading(false);
      });
  }, []);

  toast.configure();
  const showToast = () => {
    toast("Please log in as a registered recipient to reserve a donation!", {
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
      // } else {
      //   showToast();
    }
  };

  return (
    <div>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : (
        <Header
          size="medium"
          color="green"
          textAlign="center"
          style={{
            fontFamily: "Alternate Gothic",
            letterSpacing: 1.25,
          }}
        >
          AVAILABLE DONATIONS:
        </Header>
      )}
      {donations.map((donation) => (
        <Segment className="result" key={donation.id}>
          <Item.Group divided style={{ marginLeft: 30 }}>
            <Item>
              <br />
              {donation.info.postImageUrl ? (
                <Item.Image
                  as="a"
                  src={donation.info.postImageUrl}
                  alt=""
                  href={`/supplier/${donation.info.supplierId}`}
                  style={{ marginRight: 70, marginTop: 10 }}
                />
              ) : (
                <Item.Image
                  as="a"
                  src={post}
                  alt=""
                  href={`/supplier/${donation.info.supplierId}`}
                  style={{ marginRight: 70, marginTop: 10 }}
                />
              )}
              <br />
              <Item.Content>
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
                <br />
              </Item.Content>
              <Segment vertical>
                {userInfo.Type === "Recipient" ? (
                  <Button
                    basic
                    positive
                    style={{ marginTop: 20 }}
                    onClick={() => handleClick(donation)}
                    alt=""
                  >
                    Reserve
                  </Button>
                ) : (
                  <Button
                    basic
                    positive
                    style={{ marginTop: 20 }}
                    onClick={() => showToast()}
                  >
                    Reserve
                  </Button>
                )}
              </Segment>
            </Item>
          </Item.Group>
        </Segment>
      ))}
    </div>
  );
};

export default RecDonations;
