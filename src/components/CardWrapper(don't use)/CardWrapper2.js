/* eslint-disable global-require */
import { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner/spinner";
import CreateCard from "../CreateCard/CreateCard";
import AlertComponent from "../Alert/Alert";
import TheMovieDbService from "../../Service/TheMovieDbService";
import "./CardWrapper.css";
import "../Spinner/spinner.css";

export default class CardWrapper2 extends Component {
  TheMovieDbService = new TheMovieDbService();

  constructor(props) {
    super(props);
    this.state = {
      movieList: null,
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    const { currentPage, searchWord } = this.props;
    this.updateData(currentPage, searchWord);
  }

  componentDidUpdate(pervProps) {
    const { currentPage, searchWord } = this.props;
    if (currentPage !== pervProps.currentPage)
      this.updateData(currentPage, searchWord);
    if (searchWord !== pervProps.searchWord)
      this.updateData(currentPage, searchWord);
  }

  updateData = (currentPage, searchWord) => {
    this.setState({ loading: true });
    this.TheMovieDbService.getMovies(currentPage, searchWord)
      .then((response) => {
        const { movieList, totalPages } = response;
        console.log(movieList, totalPages);
        this.onMoviesLoad(movieList, totalPages);
      })
      .catch((response) => {
        console.log(response);
        this.setState({ loading: false, error: true, movieList: null });
      });
  };

  onMoviesLoad = (arrayOfMovies, totalPage) => {
    const { totalPageCount } = this.props;
    totalPageCount(totalPage);
    this.setState({ movieList: arrayOfMovies, loading: false });
  };

  render() {
    const { movieList, loading, error } = this.state;

    const { RateChangeHandler } = this.props;

    function onMovieListLoad(array) {
      const movieCard = array.map((movieData) => (
        <CreateCard
          key={movieData.id}
          movieData={movieData}
          RateChangeHandler={RateChangeHandler}
        />
      ));
      return movieCard;
    }

    function errorHandler() {
      const errIndicator = error ? <AlertComponent /> : null;
      return errIndicator;
    }

    function loadingHandler() {
      const spinner = loading ? <Spinner /> : null;
      return spinner;
    }

    return (
      <section className="cardWrapper">
        {errorHandler()}
        <ul className="movieList">
          {movieList ? onMovieListLoad(movieList) : loadingHandler()}
        </ul>
      </section>
    );
  }
}

CardWrapper2.propTypes = {
  totalPageCount: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  searchWord: PropTypes.string.isRequired,
  RateChangeHandler: PropTypes.func.isRequired,
};
