import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import Friends from "../friends/Friends";

import "./ProfileRightBar.scss";

export default function ProfileRightBar() {
    const [getUserInfo, setGetUserInfo] = useState({});
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getInfo = () => {
            const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                setGetUserInfo(doc.data());
            });
            return () => {
                unSub();
            };
        };
        currentUser.uid && getInfo();
    }, [currentUser.uid]);

    console.log(getUserInfo);

    return (
        <div className="profileRightBar">
            <div className="profileRightBarHeading">
                <span className="profileRightBarTitle"> User Information</span>
                <Link to="/profile/userId/edit" style={{ textDecoration: "none" }}>
                    <span className="editButton">Edit Profile</span>
                </Link>
            </div>

            <div className="profileRightBarInfo">
                <div className="profileRightBarInfoItem">
                    <span className="profileRightBarInfoKey">Email: </span>
                    <span className="profileRightBarInfoValue">{getUserInfo.email ? getUserInfo.email : currentUser.email}</span>
                </div>
                <div className="profileRightBarInfoItem">
                    <span className="profileRightBarInfoKey">Phone Number: </span>
                    <span className="profileRightBarInfoValue">{getUserInfo.phone}</span>
                </div>
                <div className="profileRightBarInfoItem">
                    <span className="profileRightBarInfoKey">Address: </span>
                    <span className="profileRightBarInfoValue">
                        {getUserInfo.address ? getUserInfo.address : "No Address"}
                    </span>
                </div>
                <div className="profileRightBarInfoItem">
                    <span className="profileRightBarInfoKey">Country: </span>
                    <span className="profileRightBarInfoValue">{getUserInfo.country}</span>
                </div>
            </div>
            <div className="profileRightBarHeading">
                <span className="profileRightBarTitle">Friends</span>
            </div>
            <Friends />
        </div>
    );
};

