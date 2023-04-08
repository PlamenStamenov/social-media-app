import React from "react";

import "./MenuLink.scss";

export default function MenuLink({ Icon, text }) {
    return (
        <div className="menuLink">
            {Icon}
            <span className="menuLinkText">{text}</span>
        </div>
    );
};
