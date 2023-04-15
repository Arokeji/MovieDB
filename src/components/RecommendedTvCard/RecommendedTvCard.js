import "./RecommendedTvCard.scss";
import { NavLink } from "react-router-dom";
import { LanguageSelector } from "../../App";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const RecommendedTvCard = ({ recom }) => {
  // Language
  const { language } = useContext(LanguageSelector);
  // Fetch API
  const [movieData] = useFetch(`${API_URL}/tv/${recom.id}${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Rating value
  const rating = parseInt(movieData?.vote_average * 10);
  return (
    <NavLink to={`/tvshow/${recom?.id}`} underline="none">
      <div key={recom.id} className="showroom-tv-recommended__item-card">
        <img className="showroom-tv-recommended__image" src={`https://image.tmdb.org/t/p/w400${recom.backdrop_path}`} />
        <div className="showroom-tv-recommended__info">
          <p className="showroom-tv-recommended__name">{recom.name}</p>
          <p className="showroom-tv-recommended__rating">{rating}%</p>
        </div>
      </div>
    </NavLink>
  );
};

export default RecommendedTvCard;
