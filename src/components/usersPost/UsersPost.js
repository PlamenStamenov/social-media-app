import React, { useEffect, useState } from "react";
import Share from "./../share/Share";
import "./UsersPost.scss";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Post from "./../post/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UsersPost = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        console.log("Current User:", currentUser);
        if (currentUser) {
            const q = query(collection(db, "posts"), where("uid", "==", currentUser.uid));
            const unSub = onSnapshot(q, (snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
            });
            return () => {
                unSub();
            };
        }
    }, [currentUser]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts
                    .sort((a, b) => b.data.timestamp - a.data.timestamp)
                    .map((p) => (
                        <Post key={p.id} post={p} />
                    ))}
            </div>
        </div>
    );
};

export default UsersPost;