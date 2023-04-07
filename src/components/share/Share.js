import {
    Close,
    EmojiEmotions,
    PermMedia,
    VideoCameraFront,
} from "@mui/icons-material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import React, { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import {
    addDoc,
    arrayUnion,
    collection,
    serverTimestamp,
    Timestamp,
    updateDoc,
    doc,
} from "firebase/firestore";
import Picker from "@emoji-mart/react";

import "./Share.scss";

export default function Share() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);

    const [img, setImg] = useState(null);

    const handlePost = async () => {
        if (img) {
            const storageRef = ref(storage, "Posts/" + uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(collection(db, "posts"), {
                            uid: currentUser.uid,
                            photoURL: currentUser.photoURL,
                            displayName: currentUser.displayName,
                            input,
                            img: downloadURL,
                            timestamp: serverTimestamp(),
                        });

                        await updateDoc(doc(db, "usersPosts", currentUser.uid), {
                            messages: arrayUnion({
                                id: uuid(),
                                uid: currentUser.uid,
                                photoURL: currentUser.photoURL,
                                displayName: currentUser.displayName,
                                input,
                                img: downloadURL,
                                timestamp: Timestamp.now(),
                            }),
                        });
                    });
                }
            );
        } else {
            await addDoc(collection(db, "posts"), {
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
                input,

                timestamp: serverTimestamp(),
            });

            await updateDoc(doc(db, "usersPosts", currentUser.uid), {
                messages: arrayUnion({
                    id: uuid(),
                    uid: currentUser.uid,
                    photoURL: currentUser.photoURL,
                    displayName: currentUser.displayName,
                    input,

                    timestamp: Timestamp.now(),
                }),
            });
        }
        setShowEmojis(false);
    };
    const handleKey = (e) => {
        if (e.code === "Enter") {
            e.preventDefault(); // Prevents the default behavior of submitting the form
            handlePost();
            setInput(""); // Resets the input state
            setFile(null); // Resets the file state
            setImg(null); // Resets the img state
        }
    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    const removeImage = () => {
        setImg(null);
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={currentUser.photoURL || "/assets/person/noAvatar.png"}
                        alt=""
                        className="shareProfileImg"
                    />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`What's on your mind ${currentUser.displayName} ?`}
                        className="shareInput"
                        onKeyDown={handleKey}
                    />

                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Close className="shareCancelImg" onClick={removeImage} />
                    </div>
                )}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <VideoCameraFront
                                className="shareIcon"
                                style={{ color: "#bb0000f2" }}
                            />
                            <span className="shareOptionText">Live Video</span>
                        </div>
                        <label htmlFor="file" className="shareOption">
                            <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
                            <span className="shareOptionText">Photo/Video</span>
                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setImg(e.target.files[0]);
                                }}
                            />
                        </label>
                        <div className="shareOption">
                            <EmojiEmotions
                                className="shareIcon"
                                style={{ color: "#bfc600ec" }}
                            />
                            <span className="shareOptionText">Feelings/Activity</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};