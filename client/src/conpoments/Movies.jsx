import Movie from "./Movie.jsx"

const Movies = ({movies,updateMovieReview,message}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {movies &&movies.length>0 ?movies.map((movie,index) => (
          <Movie key={index} movie={movie} updateMovieReview={updateMovieReview} />
        )):(<div className="col-12 text-center">{message}</div>)}
      </div>
    </div>
  )
}

export default Movies