import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const SingleSupplier = (props) => {
  console.log(props);
  const [supplierInfo, setSupplierInfo] = useState({});
  const [donations, setDonations] = useState({});

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
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, []);

  console.log("donations", donations);
  return (
    <div>
      <div>
        <img
          src={"https://media.giphy.com/media/de9SDw6PGRsubN1o3X/giphy.gif"}
          alt="place-holder"
        />
      </div>
      <div>
        <h2>{supplierInfo.Name}</h2>
        <p>
          {supplierInfo.Address}
          <br />
          {supplierInfo.City}, {supplierInfo.State}, {supplierInfo.Zipcode}
        </p>
        <p>{supplierInfo.Phone}</p>
      </div>
      <div>
        <h3>Available Donations</h3>
        <div>
          <ul id="date"> wkday, Month Day#, Year</ul>
          <ul id="time"> Pick-up time from props </ul>
          <ul id="quantity"> (quantity) boxes </ul>
          <button> Reserve </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSupplier;
