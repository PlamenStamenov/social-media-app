import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";

import "./Register.scss";

export default function Register() {
    const [error, setError] = useState("");
    const [prewiewImage, setPrewiewImage] = useState("/assets/profileCover/DefaultProfile.jpg");
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPrewiewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPasword.value;

        if (password !== confirmPassword) {
            setError("Password does not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(    // Create user
                auth, email, password
            );
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });    // Update user profile with username
            await setDoc(doc(db, "users", user.uid), {    // Create user document in firestore
                displayName: username,
                email: email,
                photoURL: "/assets/profileCover/DefaultProfile.jpg",
                uid: user.uid,  // User id                      
            });
            const file = fileInputRef.current.files[0];
            if (file) {
                const storageRef = ref(storage, `profile/${user.uid}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                        setError(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            updateProfile(user, { photoURL: downloadURL });
                            setDoc(doc(db, "users", user.uid), {
                                photoURL: downloadURL,
                            }, { merge: true }); // Add merge: true to update the document without overwriting existing fields
                        }).then(() => {
                            navigate("/login");
                        });
                    }
                );
            } else {
                navigate("/login"); // Navigate to login page   
            }    
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">StateHook</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on StateHook.
                    </span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <div className="top">
                            <img
                                src={prewiewImage}
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
                                        ref={fileInputRef}
                                        accept=".png,.jpeg,.jpg"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
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
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    id="confirmPasword"
                                    className="registerInput"
                                    required
                                />
                                <button type="submit" className="registerButton">
                                    Sign Up
                                </button>
                                <Link to="/login">
                                    <button className="loginRegisterButton">
                                        Log into Account
                                    </button>
                                </Link>
                                {error && <span className="error">{error}</span>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
