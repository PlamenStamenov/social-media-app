import Storycard from "../storycard/Storycard";
import { Users } from "../../data";

import "./Stories.scss";

export default function Stories () {
  return (
    <div className="stories">
      <div className="storyCard">
        <div className="overlay"></div>
        <img src="/assets/person/user.jpg" alt="" className="storyProfile" />
        <img src="/assets/person/user.jpg" alt="" className="storybackground" />
        <img src="/assets/person/upload.png" alt="" className="storyadd" />
        <span className="text">Plamen</span>
      </div>

      {Users.map((u) => (
        <Storycard key={u.id} user={u} />
      ))}
    </div>
  );
};
