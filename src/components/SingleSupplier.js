import React, { useEffect, useState } from "react";
import {
    Button,
    Header,
    Segment,
    Item,
    Dimmer,
    Loader,
    Image
} from "semantic-ui-react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import defaultIcon from "../images/Logo-2.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleSupplier = (props) => {
    const [supplierInfo, setSupplierInfo] = useState({});
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
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
                        info: doc.data()
                    }))
                );
                setLoading(false);
            });
    }, [props.match.params.id]);

    toast.configure();

    const showToast = () => {
        toast("Please log in to reserve!", {
            position: "top-center",
            autoClose: 4000
        });
    };

    const handleBack = () => {
        history.push({
            pathname: "/"
        });
    };

    const handleClick = (donation) => {
        if (currentUser) {
            setConfirmation(true);
            setSelectedDonation(donation);
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
        } else {
            showToast();
        }
    };

    if (loading) {
        return (
            <div>
                <>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>

                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </>
            </div>
        );
    }
    return (
        <div
            style={{
                marginTop: "1%",
                paddingRight: "1%",
                paddingLeft: "1%"
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
                        src={defaultIcon}
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
                    {supplierInfo.City}, {supplierInfo.State}{" "}
                    {supplierInfo.Zipcode}
                </p>
                <p>{supplierInfo.Phone}</p>
            </div>
            <div>
                <Button
                    type="submit"
                    onClick={handleBack}
                    style={{ marginLeft: 10, color: "white" }}
                >
                    Back to Home
                </Button>
                <Header
                    size="medium"
                    style={{ marginTop: 10, marginRight: -10 }}
                >
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
