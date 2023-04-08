import "./Friends.scss";

export default function Friends() {
    return (
        <div>
            <li className="sidebarFriend">
                <img src="/assets/person/noAvatar.png" alt="" className="sidebarFriendImg" />
                <span className="sidebarFriendName">Friend name</span>
            </li>
        </div>
    );
}