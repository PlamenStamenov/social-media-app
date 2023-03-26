import Feed from "../../components/feed/Feed";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;