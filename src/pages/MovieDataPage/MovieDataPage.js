import "./MovieDataPage.scss";
// import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { LanguageSelector } from "../../App";
import ShowroomCast from "../../components/ShowroomCast/ShowroomCast";
import ShowroomRecommended from "../../components/ShowroomRecommended/ShowroomRecommended";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDataPage = () => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Uso de parametros
  const { movieId } = useParams();
  // Fetch API
  const [movieData] = useFetch(`${API_URL}/movie/${movieId}${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  return (
    <main className="movies">
      <MovieDetails movieData={movieData}></MovieDetails>
      <ShowroomCast movieData={movieData}></ShowroomCast>
      <ShowroomRecommended movieData={movieData}></ShowroomRecommended>
    </main>
  );
};

export default MovieDataPage;
