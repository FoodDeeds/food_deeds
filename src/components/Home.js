import React from "react";
import RecDonations from "./RecDonations";
import logo from "../images/Logo-2.png";
import { Image, Header, Item, Segment } from "semantic-ui-react";

const Home = () => {
  return (
    <div
      style={{
        marginTop: "2%",
        paddingRight: "5%",
        paddingLeft: "5%"
      }}
    >
      <Image src={logo} alt="Logo" centered />
      <Segment style={{marginTop: 30, marginBottom: 30}}>
        <Item attached>
          <Header as="h3" attached="top" textAlign="center">
            About us
          </Header>
        </Item>
        <Header as="h5" textAlign="center">
          Each year, 40% of all edible food in the US is thrown away while 1 in
          10 households struggles with food insecurity. At Food Deeds we strive
          to bridge the gap and connect food banks with excess products from
          grocery stores, delis, and cafes.
        </Header>
      </Segment>
      <RecDonations />
    </div>
  );
};

export default Home;
