import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { Button, Item } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";

import post from "../images/post-default.png";

/**
 * user's icon, name
 * post's image
 * firebase: Description & Quantity
 * Pass them as props by PostDonation (parent)
 */

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
            // .orderBy("Timestamp", "desc")
            .onSnapshot((snapshot) => {
                setDonations(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        info: doc.data()
                    }))
                );
            });
        db.collection("Donations")
            .where("Status", "==", true)
            .onSnapshot((snapshot) => {
                setDonations(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        info: doc.data()
                    }))
                );
            });
    }, []);

    const handleClick = (donation) => {
        setDonations(donation);
        db.collection("Donations").doc(donation.id).set(
            {
                Status: false,
                recipientId: currentUser.uid
            },
            { merge: true }
        );
        history.push({
            pathname: "/confirmation",
            state: {
                donation,
                supplierInfo
            }
        });
    };

    return (
        <div>
            <h3>Currently Available For Pick-Up</h3>
            {donations.map((donation) => (
                <div className="result" key={donation.id}>
                    <Item.Group divided style={{ marginLeft: 30 }}>
                        <Item>
                            <br />
                            {donation.info.postImageUrl ? (
                                <Item.Image
                                    src={donation.info.postImageUrl}
                                    alt=""
                                    style={{ marginRight: 20, marginTop: 10 }}
                                />
                            ) : (
                                <Item.Image
                                    src={post}
                                    alt=""
                                    style={{ marginRight: 20, marginTop: 10 }}
                                />
                            )}
                            <br />
                            <Item.Content>
                                <Link
                                    to={`/supplier/${donation.info.supplierId}`}
                                >
                                    <Item.Header>
                                        {donation.info.supplierName}
                                    </Item.Header>
                                </Link>
                                <Item.Meta>
                                    Last Available Pick Up Time: <br />
                                    {donation.info.PickupTime} on{" "}
                                    {donation.info.PickupDate} <br />
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
                                    height: 30,
                                    marginRight: 20
                                }}
                                onClick={() => handleClick(donation)}
                            >
                                Reserve
                            </Button>
                        </Item>
                    </Item.Group>
                </div>
            ))}
        </div>
    );
};

export default RecDonations;
