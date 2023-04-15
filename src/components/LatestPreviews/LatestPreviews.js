import "./LatestPreviews.scss";
import { FormattedMessage } from "react-intl";
import { usePagination } from "../../hooks/usePaginator";
import useFetch from "../../hooks/useFetch";
import TrailerButton from "../TrailerButton/TrailerButton";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const LatestPreviews = () => {
  // Fetch API
  const [moviePreviews] = useFetch(`${API_URL}/movie/upcoming${API_KEY}`);
  // Paginacion
  const [firstMovies, showMoreMovies, isThereAnymore] = usePagination(moviePreviews?.results, 3);

  return (
    <div className="previews">
      <h2 className="previews__title"><FormattedMessage id="previews:title-previews" /></h2>
      {firstMovies?.map((movie) => {
        return (
          <div key={movie.id}>
            <TrailerButton movie={movie}></TrailerButton>
          </div>
        );
      })}
      {isThereAnymore && (
        <div className="previews__more">
          <button onClick={showMoreMovies} className="previews__load">
            <FormattedMessage id="common:more" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestPreviews;
