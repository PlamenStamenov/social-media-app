import "./MenuLink.scss";

export default function MenuLink ({ Icon, text }) {
  return (
    <div className="menuLink">
      {Icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">{text === "Logout" && "(Plamen)"}</span>
    </div>
  );
};
