import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Segment, Header, Divider } from "semantic-ui-react";
import { db, auth } from "../firebase";

const Confirmation = ({ location }) => {
  const donation = location.state.donation;
  const [release, setRelease] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const handleCancel = () => {
    setRelease(false);
    db.collection("Donations").doc(donation.id).set(
      {
        Status: true,
        recipientId: null,
      },
      { merge: true }
    );
  };

  const handleReserve = () => {
    setRelease(true);
    db.collection("Donations").doc(donation.id).set(
      {
        Status: false,
        recipientId: currentUser.uid,
      },
      {
        merge: true,
      }
    );
  };

  return (
    <div>
      <Segment textAlign={"center"} vertical>
        <Grid textAlign={"center"} padded="very">
          <Segment padded="very" attached="top" textAlign="center">
            {release === true ? (
              <Header as="h2" style={{ marginTop: 30, letterSpacing: 1 }}>
                {" "}
                CONFIRMED{" "}
              </Header>
            ) : (
              <Header
                as="h2"
                style={{ color: "firebrick", marginTop: 30, letterSpacing: 1 }}
              >
                CANCELED
              </Header>
            )}
            <Divider hidden />
            <Grid.Row> <b>Pick-up Date: </b>{donation.info.PickupDate}</Grid.Row>
            <Grid.Row> <b>Quantity: </b> {donation.info.Quantity} boxes</Grid.Row>
            <Grid.Row> <b>Pick-up time: </b> {donation.info.PickupTime}</Grid.Row>
            <br />
            <Grid.Row> {donation.info.supplierName} </Grid.Row>
            <Grid.Row> {donation.info.supplierAddress} </Grid.Row>
            <Grid.Row>
              {donation.info.supplierCity}, 
              {' '}{donation.info.supplierState} {donation.info.supplierZipCode}
            </Grid.Row>
            <br />
            <br />
            {release === true ? (
              <Button color="red" onClick={handleCancel}>
                Cancel
              </Button>
            ) : (
              <Button color="green" onClick={handleReserve}>
                Reserve
              </Button>
            )}
             <Link to="/account">
               <Divider hidden />
            <Button color="grey">Go to My Account</Button>
          </Link>
          </Segment>

        </Grid>

      </Segment>
    </div>
  );
};

export default Confirmation;
