import React, { useState, useEffect } from "react";
import { Button, Item, Header, Segment } from "semantic-ui-react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Graphs from "./Graphs";

const GivingHistory = (props) => {
    const userInfo = props.userInfo;
    const [donations, setDonations] = useState([]);

    const history = useHistory();

    useEffect(() => {
        db.collection("Donations")
            .where("supplierId", "==", `${userInfo.id}`)
            .onSnapshot((snapshot) => {
                setDonations(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        info: doc.data()
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
                Status: null
            },
            { merge: true }
        );
    };

    const handleEdit = (donation) => {
        history.push({
            pathname: "/donationedit",
            state: {
                donation,
                userInfo
            }
        });
    };

    const totalQty = function () {
        let total = 0;
        for (let i = 0; i < donations.length; i++) {
            if (donations[i].info.Status !== null) {
                let qty = donations[i].info.Quantity;
                total += Number.parseInt(qty);
            }
        }
        return total;
    };

    return (
        <div>
            <Graphs donations={donations} />

            <Header style={{ marginTop: 20, marginLeft: 30 }}>
                Giving History
            </Header>
            <Item.Description style={{ marginLeft: 30 }}>
                You have donated a total of {totalQty()} boxes of food. Way to
                go!
            </Item.Description>
            {donations.map((donation) => (
                <Segment
                    className="result"
                    key={donation.id}
                    style={{ width: 300, marginLeft: 30 }}
                >
                    {/* <Item.Group divided style={{ marginLeft: 30 }}> */}
                    <Item>
                        <br />
                        <Item.Content
                            style={{ marginTop: -20, marginBottom: 20 }}
                        >
                            <Item.Description>
                                {donation.info.Description}
                            </Item.Description>
                            <Item.Meta>
                                {donation.info.PickupDate}
                                <br />
                                at {donation.info.PickupTime} <br />
                            </Item.Meta>
                            Quantity: {donation.info.Quantity} boxes
                            <br />
                        </Item.Content>

                        {donation.info.Status === null ? (
                            <p>
                                <Button
                                    basic
                                    color="red"
                                    style={{
                                        width: 100,
                                        height: 35,
                                        marginRight: 20
                                    }}
                                >
                                    Canceled
                                </Button>
                            </p>
                        ) : (
                            <p>
                                <Button
                                    basic
                                    color="green"
                                    onClick={() => handleEdit(donation)}
                                    style={{
                                        width: 100,
                                        height: 35,
                                        marginRight: 20
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    basic
                                    onClick={() => handleCancel(donation)}
                                    color="green"
                                    style={{
                                        width: 100,
                                        height: 35,
                                        marginRight: 20
                                    }}
                                >
                                    Cancel
                                </Button>
                            </p>
                        )}
                    </Item>
                    {/* </Item.Group> */}
                </Segment>
            ))}
        </div>
    );
};

export default GivingHistory;
