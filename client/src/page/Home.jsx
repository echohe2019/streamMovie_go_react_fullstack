import {useEffect, useState} from "react";
import axiosClient from "../api/axiosConfig.js";
import Movies from "../conpoments/Movies.jsx";

const Home = ({updateMovieReview}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setMessage("");
            try {
                const response = await axiosClient.get('/movies');
                setMovies(response.data);
                if (response.data.length === 0) {
                    setMessage("No movies found");
                }
            } catch (error) {
                console.error("error in fetchMovies", error);
                setMessage("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);
    return (
        <>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <Movies movies={movies} updateMovieReview={updateMovieReview} message={message}/>
            )}
        </>
    );
};
export default Home;
