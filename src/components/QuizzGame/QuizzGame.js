import { FormattedMessage } from "react-intl";
import { LanguageSelector } from "../../App";
import { useEffect, useState, useContext } from "react";
import "./QuizzGame.scss";

const QuizzGame = ({ movieData }) => {
  // Language
  const { language } = useContext(LanguageSelector);

  // Estados
  const [randomMovies, setRandomMovies] = useState([]);
  const [randomCorrect, setRandomCorrect] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [resolved, setResolved] = useState();

  // Selecciona 4 películas aleatorias y actualiza el estado del array
  const selectRandomMovies = () => {
    const indicesAleatorios = [];
    while (indicesAleatorios.length < 4) {
      const index = Math.floor(Math.random() * movieData.length);
      if (!indicesAleatorios.includes(index)) {
        indicesAleatorios.push(index);
      }
    }
    const nuevasPeliculasAleatorias = indicesAleatorios.map((indice) => movieData[indice]);
    setRandomMovies(nuevasPeliculasAleatorias);
    setRandomCorrect(Math.floor(Math.random() * 4));
  };

  useEffect(() => {
    movieData && selectRandomMovies();
  }, [movieData]);

  movieData && console.log(randomMovies[randomCorrect]);

  return (
    randomMovies[randomCorrect] && (
      <>
        <div className="quizz__game">
          <div className="quizz__poster">
            <img className={resolved ? "quizz__image-quizz--solved" : "quizz__image-quizz"} src={`https://image.tmdb.org/t/p/w300/${randomMovies[randomCorrect]?.poster_path}`} alt={randomMovies[randomCorrect]?.title} />
          </div>
          <h2 className="quizz__title">{resolved ? randomMovies[randomCorrect]?.title : "???"}</h2>
          <p className="quizz__info">
            {new Date(randomMovies[randomCorrect]?.release_date).toLocaleDateString(language, { year: "numeric", month: "short", day: "numeric" })} ({language.slice(3)})
          </p>
          <p className="quizz__tagline">{randomMovies[randomCorrect]?.tagline}</p>
          <p className="quizz__overview">
            <FormattedMessage id="moviedata:summary" />
          </p>
          <p className="quizz__overview-text">{randomMovies[randomCorrect]?.overview}</p>
        </div>
        <div className="quizz__options">
          <h2 className="quizz__options-title">
            <FormattedMessage id="quizz:options" />
          </h2>
          {randomMovies &&
            randomMovies.map((movie, index) => {
              return (
                <div key={movie.id}>
                  <button
                    className={selectedOption === index ? "quizz__button--selected" : "quizz__button"}
                    onClick={() => {
                      setSelectedOption(index);
                    }}
                  >
                    {movie.title}
                  </button>
                </div>
              );
            })}
          <div className="quizz__actions">
            <button className="quizz__reset" onClick={() => location.reload()}><FormattedMessage id="quizz:reset" /></button>
            <button className="quizz__resolve" onClick={() => selectedOption === randomCorrect ? setResolved(true) : setResolved(false) }><FormattedMessage id="quizz:resolve" /></button>
          </div>
        </div>
      </>
    )
  );
};

export default QuizzGame;
