import {useEffect, useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import Movies from "../conpoments/Movies.jsx";

const Recommended = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
       const fetchRecommendedMovies = async ()=>{
            setLoading(true);
            setMessage('');
            try{
                const response = await axiosPrivate.get('/recommendedmovies');
                console.log(response.data);
                setMovies(response.data);
            }catch (error){
                console.error('Error fetching recommended movies', error);
            }finally {
                setLoading(false);
            }
       }

       fetchRecommendedMovies();
    }, [])
    return (
        <>
            {loading?(
                <h2>Loading...</h2>
            ):(
                <Movies movies={movies} message={message} />
            )}
        </>
    )
}
export default Recommended
