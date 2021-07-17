import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import "semantic-ui-css/semantic.min.css";
import { Button, List, Image } from "semantic-ui-react";
import EditAccount from "./EditAccount";
import OrderHistory from "./OrderHistory";
import GivingHistory from "./GivingHistory";
import { useHistory } from "react-router-dom";
import notificationLogo from "../images/Logo-3.png";
const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editForm, setEditForm] = useState(false);
  const history = useHistory();

  const confirmSubscription = () => {
    //displaying notification from service worker
    if ("serviceWorker" in navigator) {
      const options = {
        body: "You have successfully subscribed to our notification service",
        icon: notificationLogo,
        // image: (won't be seen on mac)
        dir: "ltr", //Text left to right
        lang: "en-US", //Language
        vibrate: [100, 50, 200], //vibration pattern 100 ms, pause for 50 and vibrate again for 200
        // badge: for andriod,
        tag: "confirm-notification", //To stack notification(one notification at a time)
        renotify: false, // new notifications won't vibrate after the first one
        actions: [
          { action: "confirm", title: "okay", icon: notificationLogo },
          { action: "cancel", title: "close", icon: notificationLogo },
        ], //buttons displayed next to your notifications
      };
      navigator.serviceWorker.ready.then((swRegistration) => {
        swRegistration.showNotification("Successfully subscribed!", options);
        configurePushSub();
      });
    }
  };

  // Helper function for storing subscriptions
  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const configurePushSub = async () => {
    //Managing subscriptions
    // check if we have sevice worker support
    if (!("serviceWorker" in navigator)) {
      return;
    }
    let reg;
    await navigator.serviceWorker.ready
      .then((swRegistration) => {
        reg = swRegistration;
        return swRegistration.pushManager.getSubscription(); //return any existing subscription (if they have a subscription)
      })
      .then((sub) => {
        if (sub === null) {
          //Create a new subscription
          const vapidPublicKey =
            "BBwfqvo3gILodEO0e0pTC809M9tGLKFBqt6lJum-vzpgW6gfGfDlG8_SG-13NcObfwS8atoWMUdf9lKbpxnq5LI";
          const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey,
          });
        } else {
          //If we have a subscription
        }
      })
      .then((newSub) => {
        const object = JSON.parse(JSON.stringify(newSub));
        return db.collection("subscriptions").add(object);
      })
      .then((res) => {
        if (res.ok) {
          confirmSubscription();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notificationPermission = async () => {
    //To ask user for notification permission
    await Notification.requestPermission((result) => {
      console.log("User Choice", result);
      if (result !== "granted") {
        console.log("Permission not granted");
      } else {
        confirmSubscription();
      }
    });
  };
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
            <List.Item>
              <List.Header>Notifications</List.Header>
              <Button basic color="grey" onClick={notificationPermission}>
                Enable
              </Button>
            </List.Item>
          </List>
          <Button
            color="green"
            onClick={handleEdit}
            style={{ marginLeft: 50, marginTop: 15, width: 250 }}
          >
            Edit Account
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
