import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuLink from "../menuLink/MenuLink"
import Friends from "../friends/Friends";
import { Users } from "../../data";

import "./Sidebar.scss";


export default function Sidebar() {
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
                <MenuLink Icon={<ExitToAppOutlinedIcon />} text="Logout" />

                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />

                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <Friends key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    );
};