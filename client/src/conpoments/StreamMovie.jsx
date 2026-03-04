import { useParams } from "react-router-dom";

const StreamMovie = () => {
  let params = useParams();
  let key = params.yt_id;

  return (
    <div style={{ height: "90vh" }}>
      {key != null ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${key}?autoplay=1&controls=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  );
};

export default StreamMovie;
