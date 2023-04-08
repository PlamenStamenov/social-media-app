import React from "react";
import Online from "../online/Online";

import "./Rightbarhome.scss";

export default function Rightbarhome () {
  return (
    <div className="rightbarhome">
      <div className="birthdayContainer">
        <img
          src="/assets/birthdaygifts/gift.png"
          alt=""
          className="birthdayImg"
        />
        <span className="birthdayText">
          <b>Sarah Dane</b> and <b>other friends</b> have a birthday today
        </span>
      </div>
      <img src="/assets/adv.jpg" alt="" className="rightbarAdvert" />

      <span className="rightbarTitle">Online Friends</span>

      <ul className="rightbarFriendList">
        <Online />
      </ul>
    </div>
  );
};
