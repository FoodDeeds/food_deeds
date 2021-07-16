import React, { useState, useEffect } from "react";
import { Header, Form, Button, Image, List } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: "/faq",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoader(true);

    db.collection("Contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <Form>
        <Header
          as="h2"
          color="green"
          style={{ marginLeft: 35 }}
          textAlign="center"
        >
          Contact Us
        </Header>
        <Form.Field>
          <label style={{ marginLeft: 25 }}>Name</label>
          <input
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: 20, width: 350, marginRight: 20 }}
          />
          <br />
        </Form.Field>
        <Form.Field>
          <label style={{ marginLeft: 25 }}>Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: 20, width: 350, marginRight: 30 }}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ marginLeft: 25 }}>Message</label>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginLeft: 20, width: 350, marginRight: 30 }}
          ></textarea>
        </Form.Field>
      </Form>
      <br />
      <Button
        type="submit"
        color="green"
        onClick={handleSubmit}
        style={{ marginLeft: 125, background: loader ? "orange" : "green" }}
      >
        Submit Inquiry
      </Button>
      <List>
        <Header textAlign="center" size="medium" style={{ marginTop: 30 }}>
          Ready to help us fight food insecurity?
       <br/>
       Get in touch with Food Deeds today.
        </Header>
        <List.Item
          icon="phone"
          content="1-800-GIV-FOOD"
          color="green"
          style={{ marginLeft: 30 }}
        />
        <List.Item
          icon="marker"
          content="New York, NY 10012"
          color="green"
          style={{ marginLeft: 30 }}
        />
        <List.Item
          as="a"
          icon="linkify"
          content="Food Deeds FAQ"
          color="green"
          onClick={handleClick}
          style={{ marginLeft: 30 }}
        />
      </List>
    </div>
  );
};

export default Contact;
