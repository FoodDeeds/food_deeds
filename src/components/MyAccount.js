import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
        db.collection("SignedUpUsers")
          .doc(user.uid)
          .get()
          .then((response) => {
            const data = response.data();
            setUserInfo(data);
          });
      } else {
        setUserInfo({});
        console.log("Logged out");
      }
    });
  }, []);

  return (
    <div>
      <img src={userInfo.Image} alt="logo" width="300" />
      <p>Name: {userInfo.Name}</p>
      <p>Email: {userInfo.Email}</p>
      {/* <p>Password: {userInfo.Password}</p> */}
      <p>Phone: {userInfo.Phone}</p>
      <p>Address: {userInfo.Address}</p>
      <p>State: {userInfo.State}</p>
      <p>Zip Code: {userInfo.Zipcode}</p>
      <p>Type: {userInfo.Type}</p>
      <p>Category: {userInfo.Category}</p>
      <Button color="green">Edit</Button>
      <Button color="grey">Delete</Button>
    </div>
  );
};

export default MyAccount;
