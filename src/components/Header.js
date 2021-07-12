import React, { useState, useEffect } from "react";
import { Grid, Icon, Item, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

const Header = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            }
        });
    }, []);

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
                </Sidebar>
            </Grid.Column>
        </Grid>
    );
};

export default Header;
