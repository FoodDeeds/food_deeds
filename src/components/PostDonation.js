import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import "./Post.css";
import AddPhotoIcon from "@material-ui/icons/CameraAlt";

const PostDonation = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  console.log("here is url!", url);

  const handleImage = (evt) => {
    evt.preventDefault();
    if (evt.target.files[0]) {
      setImage(evt.target.files[0]);
      console.log("image>>>>", image);
      console.log("evt>>>>", evt.target.files);
      let selectedImg = URL.createObjectURL(evt.target.files[0]);
      let imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImg;
      imagePreview.style.display = "block";
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
          db.collection("Donations")
            .add({
              postImageUrl: url,
              Description: description,
              Image: image,
              Quantity: quantity,
              PickupDate: pickupDate,
              PickupTime: pickupTime,
              Address: address,
              City: city,
              State: state,
              PostalCode: postalCode,
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
              setAddress("");
              setCity("");
              setState("");
              setPostalCode("");
              let imagePreview = document.getElementById("image-preview");
              imagePreview.style.display = "none";
              props.history.push("/");
            });
        }
      );
    }
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
            {/* img src={url} */}
            <img id="image-preview" alt="" />
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
          <label htmlFor="address">Address</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setAddress(evt.target.value)}
            value={address}
          />
          <br />
          <label htmlFor="city">City</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setCity(evt.target.value)}
            value={city}
          />
          <br />
          <label htmlFor="state">State</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setState(evt.target.value)}
            value={state}
          />
          <br />
          <label htmlFor="postalCode">Zip Code</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setPostalCode(evt.target.value)}
            value={postalCode}
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
