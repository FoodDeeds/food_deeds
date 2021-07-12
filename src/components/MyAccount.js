import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
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
                userInfo
            }
        });
    };

    return (
        <div>
            {editForm ? (
                <EditAccount userInfo={userInfo} />
            ) : (
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
                    <Button color="green" onClick={handleEdit}>
                        Edit
                    </Button>
                </div>
            )}
        </div>
        // pass in order history component in a separate div
    );
};

export default MyAccount;
