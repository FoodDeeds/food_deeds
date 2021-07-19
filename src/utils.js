// import notificationLogo from "./images/Logo-3.png";
// import { db } from "./firebase";

// const confirmSubscription = () => {
//     //displaying notification from service worker
//     if ("serviceWorker" in navigator) {
//         const options = {
//             body: "You have successfully subscribed to our notification service",
//             icon: notificationLogo,
//             // image: (won't be seen on mac)
//             dir: "ltr", //Text left to right
//             lang: "en-US", //Language
//             vibrate: [100, 50, 200], //vibration pattern 100 ms, pause for 50 and vibrate again for 200
//             // badge: for andriod,
//             tag: "confirm-notification", //To stack notification(one notification at a time)
//             renotify: false, // new notifications won't vibrate after the first one
//             actions: [
//                 { action: "confirm", title: "confirm", icon: notificationLogo },
//                 { action: "cancel", title: "close", icon: notificationLogo }
//             ] //buttons displayed next to your notifications
//         };
//         navigator.serviceWorker.ready.then((swRegistration) => {
//             swRegistration.showNotification(
//                 "Successfully subscribed!",
//                 options
//             );
//             configurePushSub();
//         });
//     }
// };

// // Helper function for storing subscriptions
// function urlBase64ToUint8Array(base64String) {
//     var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     var base64 = (base64String + padding)
//         .replace(/\-/g, "+")
//         .replace(/_/g, "/");

//     var rawData = window.atob(base64);
//     var outputArray = new Uint8Array(rawData.length);

//     for (var i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }

// const configurePushSub = async () => {
//     //Managing subscriptions
//     // check if we have sevice worker support
//     if (!("serviceWorker" in navigator)) {
//         return;
//     }
//     let reg;
//     await navigator.serviceWorker.ready
//         .then((swRegistration) => {
//             reg = swRegistration;
//             return swRegistration.pushManager.getSubscription(); //return any existing subscription (if they have a subscription)
//         })
//         .then((sub) => {
//             if (sub === null) {
//                 //Create a new subscription
//                 const vapidPublicKey =
//                     "BBwfqvo3gILodEO0e0pTC809M9tGLKFBqt6lJum-vzpgW6gfGfDlG8_SG-13NcObfwS8atoWMUdf9lKbpxnq5LI";
//                 const convertedVapidPublicKey =
//                     urlBase64ToUint8Array(vapidPublicKey);
//                 return reg.pushManager.subscribe({
//                     userVisibleOnly: true,
//                     applicationServerKey: convertedVapidPublicKey
//                 });
//             } else {
//                 //If we have a subscription
//             }
//         })
//         .then((newSub) => {
//             const object = JSON.parse(JSON.stringify(newSub));
//             return db.collection("Subscriptions").add(object);
//         })
//         .then((res) => {
//             if (res.ok) {
//                 confirmSubscription();
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };

// const notificationPermission = async () => {
//     //To ask user for notification permission
//     await Notification.requestPermission((result) => {
//         console.log("User Choice", result);
//         if (result !== "granted") {
//             console.log("Permission not granted");
//         } else {
//             confirmSubscription();
//         }
//     });
// };

// export default notificationPermission;
