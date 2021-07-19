import React from "react";
import RecDonations from "./RecDonations";
import logo from "../images/Logo-2.png";
import { Image, Header, Item, Segment, Divider } from "semantic-ui-react";

const Home = () => {
  return (
    <div
      style={{
        paddingRight: "2.5%",
        paddingLeft: "2.5%"
      }}
    >
        <Divider />
      <Segment padded="very" vertical >
        <Item attached>
        <Image src={logo} alt="Logo" centered />
        <Header
          textAlign="center"
          style={{
            fontFamily: "Georgia, sans-serif",
            letterSpacing: 1.25,
            fontSize: 18,
            marginLeft: 25,
            marginRight: 25
          }}
        >
          Each year, 40% of all edible food in the US is thrown away while 1 in
          10 households struggles with food insecurity. At Food Deeds we strive
          to bridge the gap by connecting food banks with excess product
          available at grocery stores, delis, and cafes.
        </Header>
        </Item>
      </Segment>

      <Divider hidden/>
      <RecDonations />
      <Divider />
    </div>
  );
};

export default Home;
