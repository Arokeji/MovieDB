import "./RecommendedCard.scss";
import { NavLink } from "react-router-dom";
import { LanguageSelector } from "../../App";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const RecommendedCard = ({ recom }) => {
  // Language
  const { language } = useContext(LanguageSelector);
  // Fetch API
  const [movieData] = useFetch(`${API_URL}/movie/${recom.id}${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Rating value
  const rating = parseInt(movieData?.vote_average * 10);
  return (
    <NavLink to={`/movie/${recom?.id}`} underline="none">
      <div key={recom.id} className="showroom-recommended__item-card">
        <img className="showroom-recommended__image" src={`https://image.tmdb.org/t/p/w400${recom.backdrop_path}`} />
        <div className="showroom-recommended__info">
          <p className="showroom-recommended__name">{recom.title}</p>
          <p className="showroom-recommended__rating">{rating}%</p>
        </div>
      </div>
    </NavLink>
  );
};

export default RecommendedCard;
