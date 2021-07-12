import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "semantic-ui-css/semantic.min.css";
import { Button, List } from "semantic-ui-react";
import EditAccount from "./EditAccount";
import { useHistory } from "react-router-dom";

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editForm, setEditForm] = useState(false);
  const history = useHistory();

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

  const handleEdit = () => {
    setEditForm(true);
    history.push({
      pathname: "/edit",
      state: {
        userInfo,
      },
    });
  };

  return (
    <div>
      {editForm ? (
        <EditAccount userInfo={userInfo} />
      ) : (
          <div>
        <List style={{ marginLeft: 30, width: 300 }}>
        <List.Item  style={{ width: 300 }}>
        {userInfo.Image}
          </List.Item>
          <List.Item  style={{ marginTop: 25 }}>
            <List.Header>Name:</List.Header>
            {userInfo.Name}
          </List.Item>
          <List.Item>
            <List.Header>Email:</List.Header>
            {userInfo.Email}
          </List.Item>
          <List.Item>
            <List.Header>Phone:</List.Header>
            {userInfo.Phone}
          </List.Item>
          <List.Item>
            <List.Header>Address:</List.Header>
            {userInfo.Address}
          </List.Item>
          <List.Item>
            <List.Header>State:</List.Header>
            {userInfo.State}
          </List.Item>
          <List.Item>
            <List.Header>Zipcode:</List.Header>
            {userInfo.Zipcode}
          </List.Item>
          <List.Item>
            <List.Header>Type:</List.Header>
            {userInfo.Type}
          </List.Item>
          <List.Item>
            <List.Header>Category:</List.Header>
            {userInfo.Category}
          </List.Item>
        </List>
        <Button color="green" onClick={handleEdit}  style={{ marginLeft: 30, marginTop:15, width: 250 }}>
                Edit Info
        </Button>
        </div>
      )}
    </div>
  );
};

export default MyAccount;

// <div>
// <img src={userInfo.Image} alt="logo" width="300" />
// <p>Name: {userInfo.Name}</p>
// <p>Email: {userInfo.Email}</p>
// {/* <p>Password: {userInfo.Password}</p> */}
// <p>Phone: {userInfo.Phone}</p>
// <p>Address: {userInfo.Address}</p>
// <p>State: {userInfo.State}</p>
// <p>Zip Code: {userInfo.Zipcode}</p>
// <p>Type: {userInfo.Type}</p>
// <p>Category: {userInfo.Category}</p>
// <Button color="green" onClick={handleEdit}>
//   Edit
// </Button>
// </div>
