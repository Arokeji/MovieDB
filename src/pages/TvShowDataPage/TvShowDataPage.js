import "./TvShowDataPage.scss";
// import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import TvShowDetails from "../../components/TvShowDetails/TvShowDetails";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { LanguageSelector } from "../../App";
import ShowroomTvCast from "../../components/ShowroomTvCast/ShowroomTvCast";
import ShowroomTvRecommended from "../../components/ShowroomTvRecommended/ShowroomTvRecommended";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const TvShowDataPage = () => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Uso de parametros
  const { showId } = useParams();
  // Fetch API
  const [movieData] = useFetch(`${API_URL}/tv/${showId}${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  return (
    <main className="movies">
      <TvShowDetails movieData={movieData}></TvShowDetails>
      <ShowroomTvCast movieData={movieData}></ShowroomTvCast>
      <ShowroomTvRecommended movieData={movieData}></ShowroomTvRecommended>
    </main>
  );
};

export default TvShowDataPage;
