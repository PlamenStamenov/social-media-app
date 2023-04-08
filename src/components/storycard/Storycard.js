import "./Storycard.scss";


export default function Storycard({ user }) {
    const { displayName, profileImage, image } = user;

    return (
        <div className="storyCard">
            <div className="overlay"></div>
            <img src={profileImage} alt="" className="storyProfile" />
            <img src={image} alt="" className="storybackground" />
            <span className="text">{displayName}</span>
        </div>
    );
};
