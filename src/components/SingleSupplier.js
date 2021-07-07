import React from "react";
// import { db } from "../firebase" also add { useEffect, useState } back on line 1

const SingleSupplier = () => {
  // const [userInfo, getInfo] = useState({});

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if(user) {
  //       getInfo(user);
  //       db.collection("SignedUpUsers")
  //       .doc(user.uid)
  //       .get()
  //       .then((response) => {
  //         const data = response.data();
  //         getInfo(data);
  //       });
  //     }
  //   })
  // }, []);

  return (
    <div>
      <div>
        <img src={'https://media.giphy.com/media/de9SDw6PGRsubN1o3X/giphy.gif'} alt="place-holder" />
      </div>
      <div>
      <h2> Supplier Name </h2>
          <p>
          Address
          <br />
          City, State, Zip Code
          </p>
          <p> Phone </p>
      </div>
      <div>
        <h3>
          Available Donations
        </h3>
        <div>
          <ul id="date"> wkday, Month Day#, Year</ul>
          <ul id="time"> Pick-up time from props </ul>
          <ul id="quantity"> (quantity) boxes </ul>
          <button> Reserve </button>
        </div>
      </div>
    </div>
  )
}

export default SingleSupplier;
