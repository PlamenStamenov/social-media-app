import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import EditProfile from './pages/editProfile/EditProfile';
import Profile from './pages/profile/Profile';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
    return (
        <div className="app">
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route
                            path="home"
                            element={
                                <AuthenticatedRoute>
                                    <Home />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="profile/:userId"
                            element={
                                <AuthenticatedRoute>
                                    <Profile />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="profile/:userId/edit"
                            element={
                                <AuthenticatedRoute>
                                    <EditProfile />
                                </AuthenticatedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </div>
    );
}
