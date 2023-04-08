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
    const [inputFocused, setInputFocused] = useState(false);

    const [img, setImg] = useState(null);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!input && !img) {
            return; // do not post if there is no content
        }

        try {
            if (img) {
                const storageRef = ref(storage, `Posts/${uuid()}`);
                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    "state_changed",
                    null,
                    (error) => {
                        setError(true);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
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
        } catch (err) {
            console.error(err);
            setError(true);
        }

        setInput("");
        setImg(null);
        setFile(null);
        setShowEmojis(false);
    };

    const removeImage = () => {
        setImg(null);
        setFile(null);
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
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder={`What's on your mind ${currentUser.displayName} ?`}
                        className="shareInput"
                    />
                    <button
                        className={`shareButton sharePost${!input && !img ? " sharePostDisabled" : ""}`}
                        onClick={handlePost}
                        style={{ visibility: inputFocused || img || input ? "visible" : "hidden" }}
                    >
                        Send
                    </button>
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