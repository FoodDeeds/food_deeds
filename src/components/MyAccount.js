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
    Loader,
    Dimmer
} from "semantic-ui-react";
import OrderHistory from "./OrderHistory";
import GivingHistory from "./GivingHistory";
import { useHistory } from "react-router-dom";
// import notificationPermission from "../utils";

const MyAccount = () => {
    const [userInfo, setUserInfo] = useState({});
    const [editForm, setEditForm] = useState(false);
    // const [clicked, setClicked] = useState(true);
    const [loading, setLoading] = useState(true);
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
                        setLoading(false);
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
                userInfo
            }
        });
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
        <div>
            <div>
                <Segment>
                    <Grid centered columns={2}>
                        <List>
                            <Grid.Column>
                                <List.Item style={{ width: 300 }}>
                                    <Image
                                    centered
                                        src={userInfo.Image}
                                        alt=""
                                        style={{ marginTop: 10 }}
                                    />
                                </List.Item>
                            </Grid.Column>
                            <Grid.Column>
                                <List.Item style={{ marginTop: 20 }}>
                                    <Header as="h4">Name:</Header>
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
                                    <Header as="h4">City:</Header>
                                    {userInfo.City}
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
                            <List.Item>
                                {/* <List.Header style={{ marginTop: 20 }}>
                                    Notifications
                                </List.Header> */}
                                {/* {clicked ? (
                                    <Button
                                        basic
                                        color="grey"
                                        onClick={() => {
                                            setClicked(!clicked);
                                            notificationPermission();
                                        }}
                                    >
                                        Enable
                                    </Button>
                                ) : (
                                    <Button
                                        basic
                                        color="grey"
                                        onClick={() => {
                                            setClicked(!clicked);
                                        }}
                                    >
                                        Enabled
                                    </Button>
                                )} */}
                            </List.Item>
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
