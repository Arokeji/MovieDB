import "./TVShowCard.scss";
import { useContext } from "react";
import { LanguageSelector } from "../../App";
import { NavLink } from "react-router-dom";

const TVShowCard = ({ show }) => {
  // Language
  const { language } = useContext(LanguageSelector);
  // Rating value
  const rating = parseInt(show.vote_average * 10);
  return (
    <NavLink to={`/tvshow/${show?.id}`} underline="none">
      <div className="showroom__cover">
        <img className="showroom__image" src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`} alt="Poster" />
      </div>
      <div className="showroom__rating" style={{ "--color-percentage": `rgb(${((100 - rating) * 255) / 100}, ${(rating * 255) / 100}, 150)` }}>
        <p className="showroom__value">
          {rating}
          <span className="showroom__percentage">%</span>
        </p>
      </div>
      <div className="showroom__info">
        <p className="showroom__name">{show.name}</p>
        <p className="showroom__date">{new Date(show.first_air_date).toLocaleDateString(language, { year: "numeric", month: "short", day: "numeric" })}</p>
      </div>
    </NavLink>
  );
};

export default TVShowCard;
