import "./ShowroomTvRecommended.scss";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { usePagination } from "../../hooks/usePaginator";
import { LanguageSelector } from "../../App";
import RecommendedTvCard from "../../components/RecommendedTvCard/RecommendedTvCard";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const ShowroomTvRecommended = ({ movieData }) => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Fetch API
  const [movieRecom] = useFetch(`${API_URL}/tv/${movieData?.id}/recommendations${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Paginacion
  const [firstRecom, showMoreRecom, isThereAnymore] = usePagination(movieRecom?.results, 4);

  return (
    <div className="showroom-tv-recommended">
      <h2 className="showroom-tv-recommended__title">
        <FormattedMessage id="showroom:title-recommended" />
      </h2>
      <div className="showroom-tv-recommended__list">
        {firstRecom?.map((recom) => {
          return (
            <RecommendedTvCard key={recom.id} recom={recom}></RecommendedTvCard>
          );
        })}
      </div>
      {isThereAnymore && (
        <div className="showroom-tv-recommended__more">
          <button onClick={showMoreRecom} className="showroom-tv-recommended__load">
            <FormattedMessage id="common:more" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowroomTvRecommended;
