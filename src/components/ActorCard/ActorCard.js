import "./ActorCard.scss";
// import { NavLink } from "react-router-dom";

const MovieCard = ({ actor }) => {
  return (
    // <NavLink to={`/person/${actor?.id}`} underline="none">
    <>
      <div className="card-actor__cover">
        <img className="card-actor__image" src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={`${actor.name} picture`} />
      </div>
      <div className="card-actor__info">
        <p className="card-actor__name">{actor?.name}</p>
        <p className="card-actor__character">{actor?.character}</p>
      </div>
    </>
    // </NavLink>
  );
};

export default MovieCard;
