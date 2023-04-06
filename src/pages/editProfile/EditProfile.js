import React, { useContext, useState } from "react";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./EditProfile.scss";


export default function EditProfile() {
    const { currentUser } = useContext(AuthContext);
    //edit profile information from the form and update the user profile in firebase
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const country = e.target.country.value;

        //update profile image
        if (file) {
            const storageRef = ref(storage, `profile/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(        //listen to the state of the upload task
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateProfile(currentUser, {
                            photoURL: downloadURL,
                        });
                    });
                }
            );
        }

        //update profile information
        if (name) {
            updateProfile(currentUser, {
                displayName: name,
            });
        }

        if (username) {
            updateProfile(currentUser, {
                displayName: username,
            });
        }

        if (email) {
            updateProfile(currentUser, {   
                email: email,
            });
        }

        if (password) {
            updateProfile(currentUser, {
                password: password,
            });
        }

        if (phone) {
            updateProfile(currentUser, {
                phone: phone,
            });
        }
        
        if (address) {
            updateProfile(currentUser, {
                address: address,
            });
        }

        if (country) {
            updateProfile(currentUser, {
                country: country,
            });
        }
        
        //update user information in the database
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, {
            name: name,
            username: username,
            email: email,
            password: password,
            phone: phone,
            address: address,
            country: country,
            createdAt: serverTimestamp(),
        });

        navigate(`/profile/${currentUser.displayName}`);
    };

    return (
        <div className="editProfile">
            <Navbar />
            <div className="editProfileWrapper">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src="/assets/profileCover/profilecover.jpg"
                                alt=""
                                className="profileCoverImg"
                            />
                            <img
                                src={currentUser.photoURL ? currentUser.photoURL : "/assets/profileCover/DefaultProfile.jpg"}
                                alt=""
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{currentUser.displayName}</h4>
                            <span className="profileInfoDesc">Hi Friends!</span>
                        </div>
                    </div>
                    <div className="editprofileRightBottom">
                        <div className="top">
                            <h1>Edit User Profile</h1>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <img src="/assets/profileCover/DefaultProfile.jpg" alt="" />
                            </div>
                            <div className="right">
                                <form onSubmit={handleUpdate}>
                                    <div className="formInput">
                                        <label htmlFor="file">
                                            Image: <DriveFolderUploadOutlined className="icon" />
                                        </label>
                                        <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
                                    </div>
                                    <div className="formInput">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="Jane Doe" />
                                    </div>
                                    <div className="formInput">
                                        <label>Username</label>
                                        <input type="text" name="username" placeholder="jane_doe" />
                                    </div>
                                    <div className="formInput">
                                        <label>Email</label>
                                        <input type="email" name="email" placeholder="jane_doe@gmail.com" />
                                    </div>
                                    <div className="formInput">
                                        <label>Current Password</label>
                                        <input type="password" name="password" placeholder="Enter your current password" />
                                    </div>
                                    <div className="formInput">
                                        <label>Phone</label>
                                        <input type="text" name="phone" placeholder="+4 123 456 789" />
                                    </div>
                                    <div className="formInput">
                                        <label>Address</label>
                                        <input type="text" name="address" placeholder="Melwood str. 71 Liverpool" />
                                    </div>
                                    <div className="formInput">
                                        <label>Country</label>
                                        <input type="text" name="country" placeholder="United Kingdom" />
                                    </div>
                                    <button type="submit" className="updateButton">
                                        Update Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
