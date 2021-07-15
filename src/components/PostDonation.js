import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db, storage } from "../firebase";
import "./Post.css";
import { Header, Form, Button, Image, Label } from "semantic-ui-react";

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

  const searchAddress =
    `${userInfo.Address}_${userInfo.City}_${userInfo.State}_${userInfo.Zipcode}` ||
    "";
  const addressInfo = searchAddress.replaceAll(" ", "_");
  const baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const REACT_APP_MAPBOX_TOKEN =
    "pk.eyJ1IjoiZm9vZGRlZWRzIiwiYSI6ImNrcW1vaGk2NzA5cTYydW16NnRoNWM1dHoifQ.Zrfb6NXBZ3mTeEUGdYgc6w";
  // baseURL + addressInfo + JSON access token + our Token
  const combineAddress = `${baseURL}/${addressInfo}.json?access_token=${REACT_APP_MAPBOX_TOKEN}`;

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

  const handleClick = (evt) => {
    evt.preventDefault();
    props.history.push("/");
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
                    supplierCategory: userInfo.Category,
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
            supplierCategory: userInfo.Category,
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
      <div>
        <Form>
          <Header as="h2" color="green" style={{ marginLeft: 35 }}>
            Post A New Donation
          </Header>
          <Form.Field>
            <label style={{ marginLeft: 25 }}>Description</label>
            <input
              required
              placeholder="Description"
              onChange={(evt) => setDescription(evt.target.value)}
              value={description}
              style={{ marginLeft: 20, width: 350, marginRight: 20 }}
            />
            <br />
          </Form.Field>
          <Form.Field>
            <label className="image-upload" style={{ marginLeft: 25 }}>
              Donation Image
            </label>
            <div className="imagePreview">
              <Image id="image-preview" alt="" />
            </div>
            <Image
              placeholder="Donation Image"
              alt=""
              style={{ marginRight: 20, marginTop: 10 }}
            />
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ marginLeft: 20, width: 350, marginRight: 20 }}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ marginLeft: 25 }}>Quantity</label>
            <input
              placeholder="Number of Boxes"
              value={quantity}
              onChange={(evt) => setQuantity(evt.target.value)}
              style={{ marginLeft: 20, width: 350, marginRight: 30 }}
            />
          </Form.Field>
          <Header as="h4" style={{ marginLeft: 30 }}>
            {" "}
            These items need to be picked up by:
          </Header>
          <Form.Field>
            <label style={{ marginLeft: 25 }}>Date</label>
            <input
              type="date"
              required
              onChange={(evt) => setPickupDate(evt.target.value)}
              value={pickupDate}
              style={{ marginLeft: 20, width: 350, marginRight: 20 }}
            />
            <br />
          </Form.Field>
          <Form.Field>
            <label style={{ marginLeft: 25 }}>Time</label>
            <input
              type="time"
              required
              onChange={(evt) => setPickupTime(evt.target.value)}
              value={pickupTime}
              style={{ marginLeft: 20, width: 350, marginRight: 20 }}
            />
          </Form.Field>
        </Form>
        <br />
        <Button
          type="submit"
          onClick={handleUpload}
          color="green"
          style={{ marginLeft: 90, marginTop: 15, marginBottom: 25 }}
        >
          Submit
        </Button>
        <Button onClick={handleClick}>Cancel</Button>
      </div>
    );
  }
};

export default PostDonation;
