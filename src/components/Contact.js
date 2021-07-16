import React from "react";
import { List, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Contact = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: "/faq",
    });
  };

  return (
    <List>
      <Header size="medium" style={{ marginTop: 30 }}>
        Ready to help us fight food insecurity?
      </Header>
      <Header as="h4">
        Get in touch with Food Deeds today.</Header>

      <List.Item
        icon="phone"
        content="1-800-GIV-FOOD"
        color="green"
        style={{ marginLeft: 30 }}
      />
      <List.Item
        icon="marker"
        content="New York, NY"
        color="green"
        style={{ marginLeft: 30 }}
      />
      <List.Item
        icon="mail"
        content="support@fooddeeds.com"
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
  );
};

export default Contact;
