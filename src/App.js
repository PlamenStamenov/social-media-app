import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EditProfile from "./pages/editProfile/EditProfile";
import Profile from "./pages/profile/Profile";


export default function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            {/*<Route path={currentUser ? currentUser.displayName : "login"} element={<Home />} />*/}
            <Route path="home" element={<Home />} />
            <Route index element={<Register />} />
            <Route path="profile">
              <Route path=":userId" element={<Profile />} />
              <Route path=":userId/edit" element={<EditProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
