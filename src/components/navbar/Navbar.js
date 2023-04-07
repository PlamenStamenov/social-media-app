import React, { useContext } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

import "./Navbar.scss";

export default function Navbar() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/home" style={{ textDecoration: "none" }}>
                    <span className="logo">StateHook</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon" />
                    <input
                        type="text"
                        placeholder="Search for friends, posts, and videos"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <span className="navbarLink">Homepage</span>
                    </Link>
                    <Link to={`/profile/${currentUser.displayName}`} style={{ textDecoration: "none" }}>
                        <span className="navbarLink">Timeline</span>
                    </Link>
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <PersonIcon />
                        <span className="navbarIconBadge">2</span>
                    </div>
                    <div className="navbarIconItem">
                        <ChatBubbleIcon />
                        <span className="navbarIconBadge">10</span>
                    </div>
                    <div className="navbarIconItem">
                        <NotificationsIcon />
                        <span className="navbarIconBadge">8</span>
                    </div>
                </div>
                <Link to={`/profile/${currentUser.displayName}`}>
                    <img src={currentUser.photoURL} alt="" className="navbarImg" />
                </Link>
            </div>
        </div>
    );
};