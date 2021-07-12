import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [url, setUrl] = useState("");
  const [coordinates, setCoordinates] = useState([]);

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
      }
    });
  }, []);

  // console.log("basic userInfo>>>", userInfo);
  console.log("coordinates upload", coordinates);
  const searchAddress =
    `${userInfo.Address}_${userInfo.City}_${userInfo.State}_${userInfo.Zipcode}` ||
    "";
  const addressInfo = searchAddress.replaceAll(" ", "_");
  const baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const REACT_APP_MAPBOX_TOKEN =
    "pk.eyJ1IjoiZm9vZGRlZWRzIiwiYSI6ImNrcW1vaGk2NzA5cTYydW16NnRoNWM1dHoifQ.Zrfb6NXBZ3mTeEUGdYgc6w";
  // baseURL + addressInfo + JSON access token + our Token
  const combineAddress = `${baseURL}/${addressInfo}.json?access_token=${REACT_APP_MAPBOX_TOKEN}`;

  // console.log("combineAddress url", combineAddress);

  const getCoordinates = async () => {
    const { data } = await axios.get(combineAddress);
    const coordinates = data.features[0].geometry.coordinates;
    setCoordinates(coordinates);
    console.log(
      "coordinate data fields>>>",
      data.features[0].geometry.coordinates
    );
    return coordinates;
  };

  const handleImage = (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        setImage(file);
        const selectedImg = URL.createObjectURL(file);
        const imagePreview = document.getElementById("image-preview");
        imagePreview.src = selectedImg;
        imagePreview.style.display = "block";
      } else {
        console.log("image cannot upload");
      }
    }
  };

  const handleUpload = (evt) => {
    evt.preventDefault();
    // getCoordinates();
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
              // console.log("userInfo;", userInfo);
              getCoordinates().then((coordinate) => {
                db.collection("Donations")
                  .add({
                    postImageUrl: url,
                    Description: description,
                    Quantity: quantity,
                    PickupDate: pickupDate,
                    PickupTime: pickupTime,
                    Status: true,
                    PostingTime: new Date(),
                    supplierId: userInfo.id,
                    supplierName: userInfo.Name,
                    supplierAddress: userInfo.Address,
                    supplierCity: userInfo.City,
                    supplierZipCode: userInfo.Zipcode,
                    coordinates: coordinate,
                  })
                  .then(() => {
                    setUrl("");
                    setProgress(0);
                    setDescription("");
                    setImage(null);
                    setDescription("");
                    setImage("");
                    setQuantity("");
                    setPickupDate("");
                    setPickupTime("");
                    // setUserInfo({});
                    // setCoordinates([]);
                    props.history.push("/");
                  });
              });
            });
        }
      );
    } else {
      getCoordinates().then((coordinate) => {
        // console.log("coordinate in else", coordinate);
        // console.log("description inside else", description);
        db.collection("Donations")
          .add({
            postImageUrl: null,
            Description: description,
            Quantity: quantity,
            PickupDate: pickupDate,
            PickupTime: pickupTime,
            Status: true,
            PostingTime: new Date(),
            supplierId: userInfo.id,
            supplierName: userInfo.Name,
            supplierAddress: userInfo.Address,
            supplierCity: userInfo.City,
            supplierZipCode: userInfo.Zipcode,
            coordinates: coordinate,
          })
          .then(() => {
            setUrl("");
            setProgress(0);
            setDescription("");
            setImage(null);
            setDescription("");
            setImage("");
            setQuantity("");
            setPickupDate("");
            setPickupTime("");
            // setUserInfo({});
            // setCoordinates([]);
            props.history.push("/");
          });
      });
    }
  };

  if (!userInfo.id) {
    return (
      <div>
        <h2>You have to log in</h2>
      </div>
    );
  } else {
    return (
      <div className="form">
        <h3>Post A New Donation</h3>
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
            <span>Confirm Upload</span>
          </div>
          <br />
          <label htmlFor="quantity">Quantity</label>
          <input
            className="form__text"
            required
            onChange={(evt) => setQuantity(evt.target.value)}
            value={quantity}
          />
          <h4>These items need to be picked up by:</h4>
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
