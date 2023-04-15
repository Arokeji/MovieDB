import "./ShowroomPopular.scss";
import { FormattedMessage } from "react-intl";
import { useContext, useState } from "react";
import { usePagination } from "../../hooks/usePaginator";
import { LanguageSelector } from "../../App";
import MovieCard from "../MovieCard/MovieCard";
import useFetch from "../../hooks/useFetch";
import TVShowCard from "../TVShowCard/TVShowCard";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const ShowroomPopular = () => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Estados
  const [format, setFormat] = useState("movie");
  // Fetch API
  const [trendMovies] = useFetch(`${API_URL}/${format}/popular/${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Paginacion
  const [firstMovies, showMoreMovies, isThereAnymore] = usePagination(trendMovies?.results, 4);

  return (
    <div className="showroom">
      <h2 className="showroom__title">
        <FormattedMessage id="showroom:title-popular" />
      </h2>
      <div className="showroom__filter">
        <button className={format === "movie" ? "showroom__option--selected" : "showroom__option"} onClick={() => setFormat("movie")}>
          <FormattedMessage id="showroom:popular-movies" />
        </button>
        <button className={format === "tv" ? "showroom__option--selected" : "showroom__option"} onClick={() => setFormat("tv")}>
          <FormattedMessage id="showroom:popular-tv" />
        </button>
      </div>
      <div className="showroom__list">
        {firstMovies.map((movie) => {
          return (
            <div key={movie.id} className="showroom__movie">
              {
                format === "movie" ? <MovieCard movie={movie}></MovieCard> : <TVShowCard show={movie}></TVShowCard>
              }
            </div>
          );
        })}
      </div>
      {isThereAnymore && (
        <div className="showroom__more">
          <button onClick={showMoreMovies} className="showroom__load">
            <FormattedMessage id="common:more" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowroomPopular;
