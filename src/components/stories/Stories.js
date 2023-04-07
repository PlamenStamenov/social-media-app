import React, { useContext, useEffect, useState } from "react";
import Storycard from "../storycard/Storycard";
import "./Stories.scss";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

const Stories = () => {
    const [stories, setStories] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const addStory = async () => {
        const image = await uploadImage();

        if (image) {
            createStory(image);
        }
    };

    useEffect(() => {
        const storyQuery = query(collection(db, "stories"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(storyQuery, (snapshot) => {
            setStories(
                snapshot.docs
                    .map((doc) => ({ id: doc.id, data: doc.data() }))
                    .filter((story) => {
                        const currentTime = new Date().getTime();
                        const storyTime = story.data.createdAt?.toMillis();
                        return storyTime && currentTime - storyTime <= 600000;
                    })
            );
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const uploadImage = async () => {
        return new Promise((resolve, reject) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = async (event) => {
                const file = event.target.files[0];
                const storageRef = ref(storage, `stories/${file.name}`);
                const task = uploadBytesResumable(storageRef, file);

                task.on(
                    "state_changed",
                    null,
                    (error) => {
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(storageRef);
                        resolve(downloadURL);
                    }
                );
            };

            input.click();
        });
    };

    const createStory = async (image) => {
        const storyData = {
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            profileImage: currentUser.photoURL,
            image: image,
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, "stories"), storyData);
        } catch (error) {
            console.error("Error creating story:", error);
        }
    };

    return (
        <div className="stories">
            <div className="storyCard">
                <div className="overlay"></div>
                <img src={currentUser.photoURL} alt="" className="storyProfile" />
                <img src={currentUser.photoURL} alt="" className="storybackground" />
                <img
                    src="/assets/person/upload.png"
                    alt=""
                    className="storyadd"
                    onClick={addStory}
                />
                <span className="text">{currentUser.displayName}</span>
            </div>

            {[...stories].reverse().map((story) => (
                <Storycard key={story.id} user={story.data} />
            ))}
        </div>
    );
};

export default Stories;
