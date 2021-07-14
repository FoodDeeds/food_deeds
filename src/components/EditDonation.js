import React, { useState } from "react";
import { useHistory } from "react-router";
import { Header, Form, Button, Image } from "semantic-ui-react";
import { db, storage } from "../firebase";

const EditDonation = ({location}) => {
  console.log(location.state);
  const [description, setDescription] = useState(location.state.donation.info.Description)
  const [quantity, setQuantity] = useState(location.state.donation.info.Quantity)

  const history = useHistory();

  return (
    <Form>
      <Header color="green" style={{ marginLeft: 40 }}>
        Edit Donation Details
      </Header>
      <Form.Field>
        <label style={{ marginLeft: 25  }}>Description</label>
          <input
            required
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
            style={{ marginLeft: 20, width: 350, marginRight: 20 }}
          />
          <br />
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
    </Form>
  );
};

export default EditDonation;
