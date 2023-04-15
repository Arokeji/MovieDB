import "./ShowroomRecommended.scss";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { usePagination } from "../../hooks/usePaginator";
import { LanguageSelector } from "../../App";
import RecommendedCard from "../../components/RecommendedCard/RecommendedCard";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const ShowroomRecommended = ({ movieData }) => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Fetch API
  const [movieRecom] = useFetch(`${API_URL}/movie/${movieData?.id}/recommendations${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Paginacion
  const [firstRecom, showMoreRecom, isThereAnymore] = usePagination(movieRecom?.results, 4);

  return (
    <div className="showroom-recommended">
      <h2 className="showroom-recommended__title">
        <FormattedMessage id="showroom:title-recommended" />
      </h2>
      <div className="showroom-recommended__list">
        {firstRecom?.map((recom) => {
          return (
            <RecommendedCard key={recom.id} recom={recom}></RecommendedCard>
          );
        })}
      </div>
      {isThereAnymore && (
        <div className="showroom-cast__more">
          <button onClick={showMoreRecom} className="showroom-cast__load">
            <FormattedMessage id="common:more" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowroomRecommended;
