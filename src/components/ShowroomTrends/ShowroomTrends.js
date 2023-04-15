import "./ShowroomTrends.scss";
import { FormattedMessage } from "react-intl";
import { useContext, useState } from "react";
import { usePagination } from "../../hooks/usePaginator";
import { LanguageSelector } from "../../App";
import MovieCard from "../MovieCard/MovieCard";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const ShowroomTrends = () => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Estados
  const [period, setPeriod] = useState("day");
  // Fetch API
  const [trendMovies] = useFetch(`${API_URL}/trending/movie/${period}${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Paginacion
  const [firstMovies, showMoreMovies, isThereAnymore] = usePagination(trendMovies?.results, 4);

  return (
    <div className="showroom-trends">
      <h2 className="showroom-trends__title">
        <FormattedMessage id="showroom:title-trends" />
      </h2>
      <div className="showroom-trends__selection">
        <button className={period === "day" ? "showroom-trends__period--selected" : "showroom-trends__period"} onClick={() => setPeriod("day")}>
          <FormattedMessage id="showroom:trends-today" />
        </button>
        <button className={period === "week" ? "showroom-trends__period--selected" : "showroom-trends__period"} onClick={() => setPeriod("week")}>
          <FormattedMessage id="showroom:trends-week" />
        </button>
      </div>
      <div className="showroom-trends__list">
        {firstMovies.map((movie) => {
          return (
            <div key={movie.id} className="showroom-trends__movie">
              <MovieCard movie={movie}></MovieCard>
            </div>
          );
        })}
      </div>
      {isThereAnymore && (
        <div className="showroom-trends__more">
          <button onClick={showMoreMovies} className="showroom-trends__load">
            <FormattedMessage id="common:more" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowroomTrends;
