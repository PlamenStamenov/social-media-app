import Rightbarhome from "../rightbarhome/Rightbarhome";
import ProfileRightBar from "./../profileRightBar/ProfileRightBar";

import "./Rightbar.scss";

export default function Rightbar({profile}) {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightBar /> : <Rightbarhome />}
            </div>
        </div>
    );
};