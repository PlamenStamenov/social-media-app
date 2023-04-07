import "./Storycard.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Storycard () {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="storyCard">
      <div className="overlay"></div>
      <img src={currentUser} alt="" className="storyProfile" />
      <img src={currentUser} alt="" className="storybackground" />
      <span className="text">{currentUser.displayName}</span>
    </div>
  );
};
