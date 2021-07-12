import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

const SingleSupplier = (props) => {
    const [supplierInfo, setSupplierInfo] = useState({});
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const history = useHistory();

    console.log("single supplier user>>>", currentUser);

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
                        info: doc.data()
                    }))
                );
            });
    }, [props.match.params.id]);

    const handleClick = (donation) => {
        console.log("clicked");
        setConfirmation(true);
        setSelectedDonation(donation);
        console.log("donation", donation);
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
            <div>
                <img
                    src={
                        "https://media.giphy.com/media/de9SDw6PGRsubN1o3X/giphy.gif"
                    }
                    alt="place-holder"
                />
            </div>
            <div>
                <h2>{supplierInfo.Name}</h2>
                <p>
                    {supplierInfo.Address}
                    <br />
                    {supplierInfo.City}, {supplierInfo.State},{" "}
                    {supplierInfo.Zipcode}
                </p>
                <p>{supplierInfo.Phone}</p>
            </div>
            <div>
                <h3>Available Donations</h3>
                {console.log("donations", donations)}
                {donations.map((donation) => (
                    <div className="result" key={donation.id}>
                        <p>
                            {donation.info.Address} <br />
                            {donation.info.City}, {donation.info.State}{" "}
                            {donation.info.PostalCode}
                            <br />
                            Pickup Time: {donation.info.PickupTime} <br />
                            Pickup Date: {donation.info.PickupDate} <br />
                            Quantity: {donation.info.Quantity} boxes
                            {console.log("donation>>>", donation)}
                            <br />
                            <button
                                onClick={() => handleClick(donation)}
                                alt=""
                            >
                                Reserve
                            </button>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleSupplier;
