import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { auth } from "../../firebase";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">StateHook</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Facebook.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <div className="bottom">
                            <form onSubmit={handleLogin} className="bottomBox">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    className="loginInput"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    className="loginInput"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button type="submit" className="loginButton">
                                    Sign In
                                </button>
                                <Link to="/register">
                                    <button className="loginRegisterButton">
                                        Create a New Account
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
