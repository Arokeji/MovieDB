import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LanguageSelector } from "../../App";
import useFetch from "../../hooks/useFetch";
import "./TvShowDetails.scss";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const TvShowDetails = ({ movieData }) => {
  // Language
  const { language } = useContext(LanguageSelector);
  // Rating value
  const rating = parseInt(movieData?.vote_average * 10);
  // API Requests
  const [movieCast] = useFetch(`${API_URL}/tv/${movieData?.id}/credits${API_KEY}${language === "es-ES" ? "&language=es-ES&region=ES" : ""}`);
  // Trabajos destacados
  const selectedJobs = ["Producer", "Executive Producer", "Presenter"];
  const mainCast =
    movieCast &&
    movieCast?.crew?.filter((crewMember) => {
      return selectedJobs.some((job) => crewMember.job === job);
    });

  // Almacena el cast con los trabajos destacados anteriormente y pone al "Director" en primer lugar
  const castArray = mainCast
    ?.reduce((acc, curr) => {
      const index = acc.findIndex((obj) => obj.name === curr.name);
      if (index === -1) {
        acc.push({ id: curr.id, name: curr.name, jobs: [curr.job] });
      } else {
        acc[index].jobs.push(curr.job);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      // Ordena por la cantidad de trabajos de mayor a menor
      const castOrdered = b.jobs.length - a.jobs.length;
      // Si uno de los objetos tiene el trabajo "Director", ese debería estar primero
      if (a.jobs.includes("Director") || b.jobs.includes("Director")) {
        if (a.jobs.includes("Director")) {
          return -1;
        } else {
          return 1;
        }
      }
      return castOrdered;
    });

  return (
    <div className="movie">
      <div className="movie__poster">
        <img className="movie__image" src={`https://image.tmdb.org/t/p/w300/${movieData?.poster_path}`} alt={movieData?.title} />
      </div>
      <h2 className="movie__title">
        {movieData?.name} ({new Date(movieData?.first_air_date).getFullYear()}-{new Date(movieData?.last_air_date).getFullYear()})
      </h2>
      <p className="movie__info">
        {new Date(movieData?.first_air_date).toLocaleDateString(language, { year: "numeric", month: "short", day: "numeric" })} ({language.slice(3)}) |{" "}
        {movieData?.genres.map((genre, index, arr) => {
          return (
            <span key={genre.id}>
              {genre.name}
              {index !== arr.length - 1 && ", "}
            </span>
          );
        })}{" "}
      </p>
      <div className="movie__score">
        <div className="movie__rating" style={{ "--color-percentage": `rgb(${((100 - rating) * 255) / 100}, ${(rating * 255) / 100}, 150)` }}>
          <p className="movie__value">
            {rating}
            <span className="movie__percentage">%</span>
          </p>
        </div>
        <p className="movie__rating-text">
          <FormattedMessage id="moviedata:user-rating" />
        </p>
      </div>
      <p className="movie__tagline">{movieData?.tagline}</p>
      <p className="movie__overview">
        <FormattedMessage id="moviedata:general-view" />
      </p>
      <p className="movie__overview-text">{movieData?.overview}</p>
      {castArray?.map((member) => {
        return (
          <div key={member.id}>
            <p className="movie__cast-name">{member.name}</p>
            <p className="movie__cast-jobs">
              {member.jobs.map((job, index, arr) => (
                <span key={job}>
                  {job}
                  {index !== arr.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TvShowDetails;
