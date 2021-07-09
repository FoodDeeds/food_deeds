import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import "./Post.css";
import AddPhotoIcon from "@material-ui/icons/CameraAlt";
import logo from "../images/Logo-2.png";

const PostDonation = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(logo);

  const handleImage = (evt) => {
    const file = evt.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        setImage(file);
      } else {
        console.log("image cannot upload");
      }
    }
  };

  const handleUpload = (evt) => {
    evt.preventDefault();
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress 1%...100%
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log("error uploading picture", error);
          // alert(error.message);
        },
        () => {
          // upload complete function...
          storage
            .ref("images")
            .child(image.name) // Upload the file and metadata
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    }
    // console.log("image here!!", image);
    db.collection("Donations")
      .add({
        postImageUrl: url,
        Description: description,
        Quantity: quantity,
        PickupDate: pickupDate,
        PickupTime: pickupTime,
        Status: true,
        PostingTime: new Date(),
        supplierId: userInfo.uid,
      })
      .then(() => {
        setUrl(null);
        setProgress(0);
        setDescription("");
        setImage(null);
        setDescription("");
        setImage("");
        setQuantity("");
        setPickupDate("");
        setPickupTime("");
        props.history.push("/");
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
        // } else {
        //     setUserInfo({});
      }
    });
  });

  if (!userInfo.uid) {
    return (
      <div>
        <h2>You have to log in</h2>
      </div>
    );
  } else {
    return (
      <div className="form">
        <h2>Post a donation</h2>
        <form onSubmit={handleUpload}>
          <label htmlFor="description">Description</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setDescription(evt.target.value)}
            value={description}
          />
          <br />
          <div className="imagePreview">
            {/* can add onClick func inside img tag to remove image */}
            {url ? <img src={url} alt="" /> : <img src={logo} alt="logo" />}
          </div>
          <br />
          <div className="image-upload">
            <label htmlFor="file-input">
              <AddPhotoIcon style={{ cursor: "pointer" }} />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            <button className="button">Confirm Upload</button>
          </div>
          <br />
          <label htmlFor="quantity">Quantity</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setQuantity(evt.target.value)}
            value={quantity}
          />
          <h4>Please enter pickup information:</h4>
          <br />
          <label htmlFor="pickupDate">Date</label>
          <input
            type="date"
            className="form__text"
            required
            onChange={(evt) => setPickupDate(evt.target.value)}
            value={pickupDate}
          />
          <br />
          <label htmlFor="pickupTime">Time</label>
          <input
            type="time"
            className="form__text"
            required
            onChange={(evt) => setPickupTime(evt.target.value)}
            value={pickupTime}
          />
          <br />
          <button>Submit</button>
          <button>Cancel</button>
        </form>
      </div>
    );
  }
};

export default PostDonation;
