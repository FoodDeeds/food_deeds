import React, { useState } from "react";
import { Header, Form, Button, List, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

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
        showToast();
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  toast.configure();
  const showToast = () => {
    toast("Your message has been submitted👍   Please allow 2-3 business days for our team to respond.", {
      position: "top-center",
      autoClose: 7000,
    });
  };

  return (
    <div>
      <Segment>
        <Form autoComplete="off">
          <Header textAlign="center" size="medium" style={{ marginTop: 30 }}>
            Ready to help us fight food insecurity?
            <br />
            Get in touch with Food Deeds today.
          </Header>
          <Form.Field>
            <label style={{ marginLeft: 5 }}>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{width: 325, marginRight: 20 }}
            />
            <br />
          </Form.Field>
          <Form.Field>
            <label style={{ marginLeft: 5 }}>Email</label>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: 325, marginRight: 30 }}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ marginLeft: 5 }}>Message</label>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: 325, marginRight: 30 }}
            ></textarea>
          </Form.Field>
          {error && <span className="error__msg">{error}</span>}
        </Form>
        <br />
        <Button
          type="submit"
          color="green"
          onClick={handleSubmit}
          style={{ background: loader ? "orange" : "green" }}
        >
          Submit Inquiry
        </Button>
      </Segment>
      <Segment>
        <List>
          <List.Content as="h3">General Inquiries</List.Content>
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
      </Segment>
    </div>
  );
};

export default Contact;
