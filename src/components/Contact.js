import React from "react";
import { List, Header } from "semantic-ui-react";

const Contact = () => {
  return (
    <List style={{ marginLeft: 30 }}>
      <Header size="medium" style={{ marginTop: -10 }}>
        Ready to help us fight food insecurity? Get in touch with Food Deeds
        today.
      </Header>

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
        icon="linkify"
        content={
          <a href="https://capstone-fooddeeds.web.app/">Food Deeds FAQ</a>
        }
        color="green"
        style={{ marginLeft: 30 }}
      />
    </List>
  );
};

export default Contact;
