import "./ShowroomCast.scss";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { usePagination } from "../../hooks/usePaginator";
import { LanguageSelector } from "../../App";
import ActorCard from "../ActorCard/ActorCard";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const ShowroomCast = ({ movieData }) => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Fetch API
  const [movieCast] = useFetch(`${API_URL}/movie/${movieData?.id}/credits${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Ordenado
  const movieCarstOrdered = movieCast?.cast?.sort((a, b) => a.order - b.order)
  // Paginacion
  const [firstActors, showMoreActors, isThereAnymore] = usePagination(movieCarstOrdered, 4);

  return (
    <div className="showroom-cast">
      <h2 className="showroom-cast__title">
        <FormattedMessage id="showroom:title-cast" />
      </h2>
      <div className="showroom-cast__list">
        {firstActors.map((actor) => {
          return (
            <div key={actor.id} className="showroom-cast__actor-card">
              <ActorCard actor={actor}></ActorCard>
            </div>
          );
        })}
      </div>
      {isThereAnymore && (
        <div className="showroom-cast__more">
          <button onClick={showMoreActors} className="showroom-cast__load">
            <FormattedMessage id="common:more" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowroomCast;
