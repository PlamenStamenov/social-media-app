import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./Register.scss";

export default function Register() {
    const handleRegister = (e) => {

    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">StateHook</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on Facebook.
                    </span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <div className="top">
                            <img
                                src="/assets/profileCover/DefaultProfile.jpg"
                                alt=""
                                className="profileImg"
                            />
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlined className="icon" />
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        accept=".png,.jpeg,.jpg"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="bottom">
                            <form onSubmit={handleRegister} className="bottomBox">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    id="username"
                                    className="registerInput"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    className="registerInput"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    className="registerInput"
                                    required
                                />
                                {/*<input
                                    type="password"
                                    placeholder="Confirm Password"
                                    id="confirmPasword"
                                    className="registerInput"
                                    required
                                />*/}
                                <button type="submit" className="registerButton">
                                    Sign Up
                                </button>
                                <Link to="/login">
                                    <button className="loginRegisterButton">
                                        Log into Account
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
