import React from "react";
import RecDonations from "./RecDonations";
import logo from "../images/Logo-2.png";
import { Image, Header, Item, Segment, Divider } from "semantic-ui-react";

const Home = () => {
  return (
    <div
      style={{
        paddingRight: "2.5%",
        paddingLeft: "2.5%",
      }}
    >
       <Divider hidden />
      <Image src={logo} alt="Logo" centered />
      <Divider hidden />
      <Segment style={{ marginTop: 30, marginBottom: 30 }}>
        <Item attached>
          <Header
            attached="top"
            textAlign="center"
            style={{
              fontSize: 22,
              fontFamily: "Georgia, sans-serif",
              border: "1px",
              letterSpacing: 1
            }}
          >
            ABOUT US
          </Header>
          <Divider />
        </Item>
        <Header
          textAlign="center"
          style={{ fontSize: 18, fontFamily: "Alternate Gothic", fontWeight: "normal" }}
        >
          Each year, 40% of all edible food in the US is thrown away while 1 in
          10 households struggles with food insecurity. At Food Deeds we strive
          to bridge the gap by connecting food banks with excess product
          available at grocery stores, delis, and cafes.
        </Header>
      </Segment>
      <br/>
      <RecDonations />
      <Divider />
    </div>
  );
};

export default Home;
