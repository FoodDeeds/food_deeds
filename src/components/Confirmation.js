import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
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
                recipientId: null
            },
            { merge: true }
        );
    };

    const handleReserve = () => {
        setRelease(true);
        db.collection("Donations").doc(donation.id).set(
            {
                Status: false,
                recipientId: currentUser.uid
            },
            {
                merge: true
            }
        );
    };

    return (
        <div>
            {release === true ? (
                <h2> Pick-up Confirmed </h2>
            ) : (
                <h2>Order Cancelled</h2>
            )}
            <p> Pick-up Date: {donation.info.PickupDate}</p>
            <p> Quantity:{donation.info.Quantity} boxes</p>
            <br />
            <p> Pick-up time: {donation.info.PickupTime}</p>
            <br />
            <p> Supplier Name: {donation.info.supplierName} </p>
            <p> Address: {donation.info.supplierAddress} </p>
            <p>
                {donation.info.supplierCity}
                {donation.info.supplierState},{donation.info.supplierZipCode}
            </p>
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
            <br />
            <br />
            <a href="/account">
                <Button color="green">Go to My Account</Button>
            </a>
        </div>
    );
};

export default Confirmation;
