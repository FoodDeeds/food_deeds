import React, { useState } from "react";
import { useHistory } from "react-router";
import "semantic-ui-css/semantic.min.css";
import {
  Header,
  Form,
  Button,
  Image,
  Loader,
  Segment,
  Dimmer,
  Divider,
} from "semantic-ui-react";
import { db, storage } from "../firebase";

const EditAccount = ({ location }) => {
  const userInfo = location.state.userInfo;
  const [type, setType] = useState(userInfo.Type);
  const [category, setCategory] = useState(userInfo.Category);
  const [name, setName] = useState(userInfo.Name);
  const [phone, setPhone] = useState(userInfo.Phone);
  const [email, setEmail] = useState(userInfo.Email);
  const [password, setPassword] = useState(userInfo.Password);
  const [address, setAddress] = useState(userInfo.Address);
  const [city, setCity] = useState(userInfo.City);
  const [zipcode, setZipcode] = useState(userInfo.Zipcode);
  const [state, setState] = useState(userInfo.State);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const history = useHistory();

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
        window.alert("image cannot upload");
      }
    }
  };

  const handleUpdate = (evt) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          window.alert("Oh no! There was an error uploading your logo", error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              db.collection("SignedUpUsers")
                .doc(userInfo.id)
                .update({
                  Image: url,
                  Type: type,
                  Category: category,
                  Name: name,
                  Phone: phone,
                  Email: email,
                  Password: password,
                  Address: address,
                  City: city,
                  Zipcode: zipcode,
                  State: state,
                })
                .then(() => {
                  history.push({
                    pathname: "/account",
                  });
                });
            });
        }
      );
    } else if (userInfo.Image) {
      db.collection("SignedUpUsers")
        .doc(userInfo.id)
        .set(
          {
            Type: type,
            Category: category,
            Name: name,
            Phone: phone,
            Email: email,
            Password: password,
            Address: address,
            City: city,
            Zipcode: zipcode,
            State: state,
          },
          { merge: true }
        )
        .then(() => {
          history.push({
            pathname: "/account",
          });
        });
    }
  };

  const handleClick = () => {
    handleUpdate();
  };

  if (progress) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading {progress}%</Loader>
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }

  return (
    <Form  >
      <Segment textAlign={"center"} vertical>
        <Header size="medium" color="green" style={{ letterSpacing: 1 }}>
          EDIT ACCOUNT INFO
        </Header>
      </Segment >
      <Segment textAlign={"center"} vertical>
        {!userInfo.Image ? (
          <Form.Field>
            <label className="image-upload">Organization Logo</label>
            <div className="imagePreview">
              <Image centered id="image-preview" alt="" />
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ width: 300 }}
            />
          </Form.Field>
        ) : (
          <div>
            <Form.Field>
              <label className="image-upload">Organization Logo</label>
              <br />
              <Image
                centered
                src={userInfo.Image}
                alt="logo"
              />
              <br />
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ width: 300 }}
              />
            </Form.Field>
          </div>
        )}
        <br />
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <input
            placeholder="Phone"
            value={phone}
            onChange={(evt) => setPhone(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input
            placeholder="Address"
            value={address}
            onChange={(evt) => setAddress(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            placeholder="City"
            value={city}
            onChange={(evt) => setCity(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>State</label>
          <input
            placeholder="State"
            value={state}
            onChange={(evt) => setState(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Zip Code</label>
          <input
            placeholder="Zip Code"
            value={zipcode}
            onChange={(evt) => setZipcode(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Type</label>
          <input
            placeholder="Type"
            value={type}
            onChange={(evt) => setType(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <input
            placeholder="Category"
            value={category}
            onChange={(evt) => setCategory(evt.target.value)}
            style={{ width: 300 }}
          />
        </Form.Field>
      </Segment>
      <Segment textAlign={"center"}>
        <Button
          type="submit"
          onClick={handleClick}
          color="green"
          style={{ marginTop: 15, marginBottom: 10 }}
        >
          Submit
        </Button>
        <br />
        <Button
          type="submit"
          onClick={handleClick}
          style={{ marginBottom: 25 }}
        >
          Cancel
        </Button>
      </Segment>
      <Divider />
    </Form>
  );
};

export default EditAccount;
