import { useContext } from "react";
import { LanguageSelector } from "../../App";
import QuizzGame from "../../components/QuizzGame/QuizzGame";
import useFetch from "../../hooks/useFetch";
import "./QuizzPage.scss";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const QuizzPage = () => {
  // Idioma
  const { language } = useContext(LanguageSelector);
  // Fetch API
  const [movieData] = useFetch(`${API_URL}/movie/top_rated${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  return (
    <main className="quizz">
      <QuizzGame movieData={movieData?.results}></QuizzGame>
    </main>
  );
};

export default QuizzPage;
