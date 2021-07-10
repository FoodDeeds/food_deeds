import React, { useState } from "react";
import { Grid, Icon, Item, Menu, Segment, Sidebar } from "semantic-ui-react";
import RecDonations from "./RecDonations";
import Footer from "./Footer";
import logo from "../images/Logo-2.png";

const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Icon
          name="content"
          size="huge"
          color="green"
          onMouseEnter={(e) => setSidebarVisible(true)}
          onMouseLeave={(e) => setSidebarVisible(false)}
          style={{ marginLeft: -8, marginTop: 10 }}
        />
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            vertical
            visible={sidebarVisible}
            width="thin"
            onMouseEnter={(e) => setSidebarVisible(true)}
            onMouseLeave={(e) => setSidebarVisible(false)}
            color="Standard"
          >
            <Menu.Item>
              <Icon name="home" color="green" />
              <Item.Description style={{ color: "green" }}>
                Home
              </Item.Description>
            </Menu.Item>
            <Menu.Item>
              <Icon name="user circle" color="green" />
              <Item.Description style={{ color: "green" }}>
                My Account
              </Item.Description>
            </Menu.Item>
            <Menu.Item>
              <Icon name="write square" color="green" />
              <Item.Description style={{ color: "green" }}>
                Donate
              </Item.Description>
            </Menu.Item>
            <Menu.Item>
              <Icon name="search" color="green" />
              <Item.Description style={{ color: "green" }}>
                Search
              </Item.Description>
            </Menu.Item>
            <Menu.Item>
              <Icon name="write info circle" color="green" />
              <Item.Description style={{ color: "green" }}>
                Contact Us
              </Item.Description>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarVisible}>
            <Segment basic>
              <img src={logo} alt="Logo" />
              <h3>About Us</h3>
              <p>
                Each year, 40% of all edible food in the US is thrown away while
                1 in 10 households struggles with food insecurity. At FoodDeeds
                we strive to bridge the gap and connect food banks with excess
                products from grocery stores, delis, and cafes.
              </p>
              <RecDonations />
              <Footer />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default Home;
