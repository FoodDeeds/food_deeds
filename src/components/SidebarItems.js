import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SearchIcon from "@material-ui/icons/Search";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import FaceIcon from "@material-ui/icons/Face";

export const SidebarItems = [
    {
        title: "HOME",
        path: "/",
        icon: <HomeIcon />,
        cName: "menu__text"
    },
    {
        title: "MY ACCOUNT",
        path: "/account",
        icon: <AccountCircleIcon />,
        cName: "menu__text"
    },
    {
        title: "DONATE",
        path: "/donate",
        icon: <PostAddIcon />,
        cName: "menu__text"
    },
    {
        title: "SEARCH",
        path: "/map",
        icon: <SearchIcon />,
        cName: "menu__text"
    },
    {
        title: "CONTACT US",
        path: "/contact",
        icon: <ContactSupportIcon />,
        cName: "menu__text"
    },
    {
        title: "LOGIN/SIGNUP",
        path: "/login",
        icon: <FaceIcon />,
        cName: "menu__text"
    }
];
