import { Component } from "react";
import TheMovieDbService from "../../Service/TheMovieDbService";
import Genres from "../../Services/GenresService";
import { Provider } from "../../AppContext/AppContext";
import MainPage from "../MainPage(refact)/MainPage";
import RatedPage from "../RatedPage/RatedPage";
import Navigation from "../Navigation/Navigation";

export default class MovieApp extends Component {
  TheMovieDbService = new TheMovieDbService();

  Genres = new Genres();

  constructor(props) {
    super(props);
    this.state = {
      sessionId: "bf1cef6dca58cef1513e5b1cdb157e47",
      isEstimated: false,
      isRatedClicked: false,
      EstimatedList: null,
    };
  }

  // componentDidMount() {
  //   this.getSessionId();
  // }

  onChangePageHandler = async (event) => {
    const { sessionId, isEstimated } = this.state;
    const GetRating = await this.TheMovieDbService.GetRating(sessionId);
    this.setState({ EstimatedList: GetRating });

    if (event.target.textContent === "Rated" && isEstimated) {
      this.setState({ isRatedClicked: true });
    } else {
      this.setState({ isRatedClicked: false });
    }
  };

  RateChangeHandler = async (estimation, movieId) => {
    const { sessionId } = this.state;
    const addEstimation = await this.TheMovieDbService.AddRating(
      sessionId,
      movieId,
      estimation
    );
    if (addEstimation) this.setState({ isEstimated: true });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  getSessionId = async () => {
    const GuestSessionId = await this.TheMovieDbService.Authorization();
    this.setState({ sessionId: GuestSessionId });
  };

  render() {
    const { isRatedClicked, EstimatedList, sessionId } = this.state;

    return (
      <Provider value={this.Genres}>
        <Navigation
          isRatedClicked={isRatedClicked}
          onChangePageHandler={(event) => {
            this.onChangePageHandler(event);
          }}
        />
        {isRatedClicked && sessionId ? (
          <RatedPage RatingList={EstimatedList} />
        ) : (
          <MainPage RateChangeHandler={this.RateChangeHandler} />
        )}
      </Provider>
    );
  }
}
