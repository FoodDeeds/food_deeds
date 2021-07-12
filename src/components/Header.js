import React, { useEffect, useState } from "react";
import { Grid, Icon, Item, Menu, Sidebar, Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

const NavBar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("Logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <Grid>
      <Grid.Column>
        <Icon
          name="content"
          size="huge"
          color="green"
          onMouseEnter={(e) => setSidebarVisible(true)}
          onMouseLeave={(e) => setSidebarVisible(false)}
          style={{ marginLeft: -8, marginTop: 10 }}
        />
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
          style={{ height: "100%" }}
        >
          <Link to="/">
            <Menu.Item>
              <Icon name="home" color="green" />
              <Item.Description style={{ color: "green" }}>
                Home
              </Item.Description>
            </Menu.Item>
          </Link>
          {currentUser && (
            <Link to="/account">
              <Menu.Item>
                <Icon name="user circle" color="green" />
                <Item.Description style={{ color: "green" }}>
                  My Account
                </Item.Description>
              </Menu.Item>
            </Link>
          )}
          <Link to="/donate">
            <Menu.Item>
              <Icon name="write square" color="green" />
              <Item.Description style={{ color: "green" }}>
                Donate
              </Item.Description>
            </Menu.Item>
          </Link>
          <Link to="/browse">
            <Menu.Item>
              <Icon name="search" color="green" />
              <Item.Description style={{ color: "green" }}>
                Search
              </Item.Description>
            </Menu.Item>
          </Link>
          <Link to="/contact">
            <Menu.Item>
              <Icon name="question circle " color="green" />
              <Item.Description style={{ color: "green" }}>
                Contact Us
              </Item.Description>
            </Menu.Item>
          </Link>
          {currentUser ? (
            <Button
              color="green"
              className="logout__btn"
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          ) : (
            <Item.Description style={{ color: "green" }}>
              <Link to="/login">
                <Button
                  color="green"
                  style={{ marginBottom: 10, marginTop: 10 }}
                >
                  LOG IN
                </Button>
              </Link>
              <Link to="/signup">
                <Button color="green">SIGN UP</Button>
              </Link>
            </Item.Description>
          )}
        </Sidebar>
      </Grid.Column>
    </Grid>
  );
};

export default NavBar;
