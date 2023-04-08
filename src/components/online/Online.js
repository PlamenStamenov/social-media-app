import "./Online.scss";

export default function Online () {
  return (
    <div className="online">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src="/assets/person/noAvatar.png"
            alt=""
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">Online user</span>
      </li>
    </div>
  );
};
