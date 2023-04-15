import "./MoviesPage.scss";
import { FormattedMessage } from "react-intl";
import ShowroomTrends from "../../components/ShowroomTrends/ShowroomTrends";
import ShowroomPopular from "../../components/ShowroomPopular/ShowroomPopular";
import LatestPreviews from "../../components/LatestPreviews/LatestPreviews";
import ShowroomFree from "../../components/ShowroomFree/ShowroomFree";

const MoviesPage = () => {
  return (
    <main className="movies">
      <div className="movies__welcome">
        <span className="movies__welcome--title"><FormattedMessage id="movies:welcome-title" /></span>
        <span className="movies__welcome--text"><FormattedMessage id="movies:welcome-text" /></span>
      </div>
      <ShowroomTrends></ShowroomTrends>
      <LatestPreviews></LatestPreviews>
      <ShowroomPopular></ShowroomPopular>
      <div className="movies__join">
        <span className="movies__join--title"><FormattedMessage id="movies:join-title" /></span>
        <span className="movies__join--text"><FormattedMessage id="movies:join-text" /></span>
      </div>
      <ShowroomFree></ShowroomFree>
    </main>
  );
};

export default MoviesPage;
