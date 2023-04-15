import "./TrailerButton.scss";
import { FormattedMessage } from "react-intl";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const TrailerButton = ({ movie }) => {
  // Fetch API
  const [movieTrailers] = useFetch(`${API_URL}/movie/${movie.id}/videos${API_KEY}`);
  return (
    <>
      <a className="previews__link" href={movieTrailers && `https://www.youtube.com/watch?v=${movieTrailers?.results[0].key}`}>
        <div className="previews__watch">
          <span className="previews__play">▶</span> <FormattedMessage id="previews:watch-on" /> {movieTrailers?.results[0].site}
        </div>
      </a>
      <p className="previews__name">{movie.title}</p>
      <p className="previews__type">{movieTrailers?.results[0].type}</p>
    </>
  );
};

export default TrailerButton;
