import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "semantic-ui-css/semantic.min.css";
import { Button, List, Image } from "semantic-ui-react";
import EditAccount from "./EditAccount";
import OrderHistory from "./OrderHistory";
import GivingHistory from "./GivingHistory";
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
  console.log("userInfo", userInfo);

  return (
    <div>
      {editForm ? (
        <EditAccount userInfo={userInfo} />
      ) : (
        <div>
          <List style={{ marginLeft: 30, width: 300 }}>
            <List.Item style={{ width: 300 }}>
              <Image
                src={userInfo.Image}
                alt=""
                style={{ marginRight: 20, marginTop: 10 }}
              />
            </List.Item>
            <List.Item style={{ marginTop: 25 }}>
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
          <Button
            color="green"
            onClick={handleEdit}
            style={{ marginLeft: 50, marginTop: 15, width: 250 }}
          >
            Edit Info
          </Button>
        </div>
      )}
      {userInfo.Type === "Recipient" ? (
        <OrderHistory userInfo={userInfo} />
      ) : (
        <GivingHistory userInfo={userInfo} />
      )}
    </div>
  );
};

export default MyAccount;
