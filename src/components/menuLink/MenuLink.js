import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./MenuLink.scss";

export default function MenuLink ({ Icon, text }) {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="menuLink">
      {Icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">{text === "Logout" && `(${currentUser.displayName})`}</span>
    </div>
  );
};
