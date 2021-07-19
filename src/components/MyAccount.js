import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  List,
  Image,
  Divider,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";
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
          <Segment>
            <Grid centered columns={2}>
              <List>
                <Grid.Column>
                  <List.Item style={{ width: 300 }}>
                    <Image
                      src={userInfo.Image}
                      alt=""
                      style={{ marginTop: 10 }}
                    />
                  </List.Item>
                </Grid.Column>
                <Grid.Column>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4" style={{ marginRight: 25 }}>
                      Name:
                    </Header>
                    {userInfo.Name}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">Email:</Header>
                    {userInfo.Email}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">Phone:</Header>
                    {userInfo.Phone}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">Address:</Header>
                    {userInfo.Address}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">State:</Header>
                    {userInfo.State}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">Zipcode:</Header>
                    {userInfo.Zipcode}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">Type:</Header>
                    {userInfo.Type}
                  </List.Item>
                  <List.Item style={{ marginTop: 20 }}>
                    <Header as="h4">Category:</Header>
                    {userInfo.Category}
                  </List.Item>
                </Grid.Column>
              </List>
            </Grid>
            <Divider hidden />
            <Segment basic textAlign={"center"}>
              <Button
                color="green"
                onClick={handleEdit}
                positive
                style={{ textAlign: "center" }}
              >
                Edit Account
              </Button>
            </Segment>
          </Segment>
        </div>
      )}
      <Segment padded="very" textAlign={"center"}>
        {userInfo.Type === "Recipient" ? (
          <OrderHistory userInfo={userInfo} />
        ) : (
          <GivingHistory userInfo={userInfo} />
        )}
      </Segment>
      <Divider />
    </div>
  );
};

export default MyAccount;
