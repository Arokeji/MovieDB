import "./MovieCard.scss";
import { useContext } from "react";
import { LanguageSelector } from "../../App";
import { NavLink } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // Language
  const { language } = useContext(LanguageSelector);
  // Rating value
  const rating = parseInt(movie.vote_average * 10);
  return (
    <NavLink to={`/movie/${movie?.id}`} underline="none">
      <div className="showroom-trends__cover">
        <img className="showroom-trends__image" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="Poster" />
      </div>
      <div className="showroom-trends__rating" style={{ "--color-percentage": `rgb(${((100 - rating) * 255) / 100}, ${(rating * 255) / 100}, 150)` }}>
        <p className="showroom-trends__value">
          {rating}
          <span className="showroom-trends__percentage">%</span>
        </p>
      </div>
      <div className="showroom-trends__info">
        <p className="showroom-trends__name">{movie.title}</p>
        <p className="showroom-trends__date">{new Date(movie.release_date).toLocaleDateString(language, { year: "numeric", month: "short", day: "numeric" })}</p>
      </div>
    </NavLink>
  );
};

export default MovieCard;
