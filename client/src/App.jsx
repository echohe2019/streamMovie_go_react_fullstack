import './App.css'
import Home from "./page/Home.jsx";
import Header from "./conpoments/Header.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./page/Register.jsx";
import Login from "./page/Login.jsx";
import Layout from "./conpoments/Layout.jsx";
import RequiredAuth from "./conpoments/RequiredAuth.jsx";
import Recommended from "./page/Recommended.jsx";
import Review from "./page/Review.jsx";
import axiosClient from "./api/axiosConfig.js";
import useAuth from "./hooks/useAuth.jsx";
import StreamMovie from "./conpoments/StreamMovie.jsx";
function App() {
    const navigate = useNavigate();
    const {auth,setAuth} = useAuth();
    const updateMovieReview = (imdb_id) => {
        navigate(`/review/${imdb_id}`);
    };
    const handleLogout = async () => {
        try {
            const response = await axiosClient.post("/logout",{user_id: auth.user_id});
            console.log(response.data);
            setAuth(null);
            // localStorage.removeItem('user');
            console.log('User logged out');

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <Header handleLogout={handleLogout}/>
            <Routes path="/" element={<Layout/>}>
                <Route path='/' element={<Home updateMovieReview={updateMovieReview} />}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route element={<RequiredAuth/>}>
                    <Route path='/recommended' element={<Recommended/>}></Route>
                    <Route path='/review/:imdb_id' element={<Review/>}></Route>
                    <Route path='/stream/:yt_id' element={<StreamMovie/>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
