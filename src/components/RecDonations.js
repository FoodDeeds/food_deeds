import React, { useState, useEffect } from "react";
import { db } from "../firebase";

/**
 * user's icon, name
 * post's image
 * firebase: Description & Quantity
 * Pass them as props by PostDonation (parent)
 */

const RecDonations = () => {
    const [donations, setDonations] = useState([]);
    const [supplierInfo, setSupplierInfo] = useState({});

    useEffect(() => {
        db.collection("Donations")
            // .where("PostalCode", "==", zipcode)
            // .orderBy("Timestamp", "desc")
            .onSnapshot((snapshot) => {
                setDonations(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        info: doc.data()
                    }))
                );
            });

        donations.forEach((donation) => {
            db.collection("SignedUpUsers")
                .doc(donation.info.supplierId)
                .get()
                .then((response) => {
                    const data = response.data();
                    setSupplierInfo(data);
                });
        });
    }, []);
    console.log("supplier info data>>>>>", supplierInfo);

    console.log("Donations!!!", donations);
    return (
        <div>
            <h3>Currently Available Donations by Supplier</h3>
            {donations.map((donation) => (
                <div className="result" key={donation.id}>
                    <p>
                        <img src={donation.info.postImageUrl} alt="" /> <br />
                        {donation.info.Description} <br />
                        {donation.info.City}, {donation.info.State}
                        {donation.info.PostalCode}
                        <br />
                        Pickup Time: {donation.info.PickupTime} <br />
                        Pickup Date: {donation.info.PickupDate} <br />
                        Quantity: {donation.info.Quantity} boxes
                        <br />
                        <button>Reserve</button>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RecDonations;
