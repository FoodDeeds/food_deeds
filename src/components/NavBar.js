import React, { useEffect, useState } from "react";
import {
  Grid,
  Icon,
  Item,
  Menu,
  Sidebar,
  Button,
  Header,
  Image,
  Sticky,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import logo from "../images/marker.jpg";
import icon from "../images/post-default.png";

const NavBar = (props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        db.collection("SignedUpUsers")
          .doc(user.uid)
          .get()
          .then((response) => {
            const data = response.data();
            setUserInfo(data);
          });
      }
    });
  }, []);

  const handleLogout = (evt) => {
    evt.preventDefault();
    auth.signOut().then(() => {
      setCurrentUser("");
      history.push("/");
    });
  };
  console.log("user info", userInfo);

  return (
    <Sticky>
      <Grid>
        <Grid.Column>
          <Menu style={{ width: "100%" }}>
            <Icon
              name="content"
              size="huge"
              color="green"
              onMouseEnter={(e) => setSidebarVisible(true)}
              onMouseLeave={(e) => setSidebarVisible(false)}
              style={{
                marginLeft: -9,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <Link to="/">
              <Header
                color="green"
                style={{ marginLeft: 600, marginTop: 15 }}
                size="huge"
              >
                <Image
                  src={logo}
                  style={{
                    width: 30,
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                Food Deeds
              </Header>
            </Link>
          </Menu>
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
            {currentUser && (
              <Menu.Item>
                <Item.Description style={{ color: "green" }}>
                  {userInfo.Image ? (
                    <Image
                      src={userInfo.Image}
                      alt=""
                      style={{
                        width: 50,
                        height: 50,
                        marginBottom: 10,
                        marginLeft: 35,
                      }}
                    />
                  ) : (
                    <Image
                      src={icon}
                      alt=""
                      style={{
                        width: 50,
                        height: 50,
                        marginBottom: 10,
                        marginLeft: 35,
                      }}
                    />
                  )}
                  Welcome, {userInfo.Name}!
                </Item.Description>
              </Menu.Item>
            )}
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
            {userInfo.Type === "Supplier" && (
              <Link to="/donate">
                <Menu.Item>
                  <Icon name="write square" color="green" />
                  <Item.Description style={{ color: "green" }}>
                    Donate
                  </Item.Description>
                </Menu.Item>
              </Link>
            )}
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
                style={{ marginBottom: 10, marginTop: 10 }}
              >
                LOG OUT
              </Button>
            ) : (
              <Item.Description style={{ color: "green" }}>
                <Link to="/login">
                  <Button
                    color="green"
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                    }}
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
    </Sticky>
  );
};

export default NavBar;
