import React, { useContext } from "react";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuLink from "../menuLink/MenuLink";
import Friends from "../friends/Friends";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./Sidebar.scss";


export default function Sidebar() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    if (!currentUser) {
        navigate("/login");
        return null;
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <MenuLink Icon={<RssFeedIcon />} text="Feed" />
                <MenuLink Icon={<ChatIcon />} text="Chats" />
                <MenuLink Icon={<VideocamIcon />} text="Videos" />
                <MenuLink Icon={<GroupsIcon />} text="Friends" />
                <MenuLink Icon={<BookmarkIcon />} text="Bookmarks" />
                <MenuLink Icon={<ShoppingCartIcon />} text="Marketplace" />
                <MenuLink Icon={<EventIcon />} text="Events" />
                <span onClick={handleLogout}>
                    <MenuLink Icon={<ExitToAppOutlinedIcon />} text="Logout" />
                </span>

                <hr className="sidebarHr" />

                <ul className="sidebarFriendList">
                    <Friends />
                    </ul>
            </div>
        </div>
    );
};