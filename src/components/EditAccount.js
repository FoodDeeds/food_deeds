import React, { useState } from "react";
import { useHistory } from "react-router";
import "semantic-ui-css/semantic.min.css";
import { Header, Form, Button } from "semantic-ui-react";
import { db } from "../firebase";

const EditAccount = ({ location }) => {
  const userInfo = location.state.userInfo;
  const [type, setType] = useState(userInfo.Type);
  const [category, setCategory] = useState(userInfo.Category);
  const [name, setName] = useState(userInfo.Name);
  const [phone, setPhone] = useState(userInfo.Phone);
  const [email, setEmail] = useState(userInfo.Email);
  const [password, setPassword] = useState("******");
  const [address, setAddress] = useState(userInfo.Address);
  const [zipcode, setZipcode] = useState(userInfo.Zipcode);
  const [state, setState] = useState(userInfo.State);
  const history = useHistory();

  const handleUpdate = () => {
    db.collection("SignedUpUsers")
      .doc(userInfo.id)
      .update({
        Type: type,
        Category: category,
        Name: name,
        Phone: phone,
        Email: email,
        Password: password,
        Address: address,
        Zipcode: zipcode,
        State: state,
      })
      .then((response) => {
        history.push({
          pathname: "/account",
        });
      });
  };

  const handleClick = () => {
    handleUpdate();
  };

  return (
    <Form style={{ marginTop: 25}}>
      <Header size="medium" color="green" style={{ marginLeft: 40 }}>
        Edit Account Information
      </Header>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Name
        </label>
        <input
          placeholder="Name"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}>
          Email
        </label>
        <input
          placeholder="Email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Phone
        </label>
        <input
          placeholder="Phone"
          value={phone}
          onChange={(evt) => setPhone(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Password
        </label>
        <input
          placeholder="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Address
        </label>
        <input
          placeholder="Address"
          value={address}
          onChange={(evt) => setAddress(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >State
        </label>
        <input
          placeholder="State"
          value={state}
          onChange={(evt) => setState(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Zip Code
        </label>
        <input
          placeholder="Zip Code"
          value={zipcode}
          onChange={(evt) => setZipcode(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Type
        </label>
        <input
          placeholder="Type"
          value={type}
          onChange={(evt) => setType(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 33}}
        >Category
        </label>
        <input
          placeholder="Category"
          value={category}
          onChange={(evt) => setCategory(evt.target.value)}
          style={{ marginLeft: 30, width: 300 }}
        />
      </Form.Field>
      <Button
        type="submit"
        onClick={handleClick}
        color="green"
        style={{ marginLeft: 125, marginTop: 15, marginBottom: 25 }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default EditAccount;
