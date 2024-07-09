import { Component } from "react";
import PropTypes from "prop-types";
import Searcher from "../Searcher(refact)/Searcher";
import MovieListWrapper from "../MovieListWrapper/MovieListWrapper";
import AlertComponent from "../Alert/Alert";
import Spinner from "../Spinner/spinner";
import PaginationEl from "../PaginatorEl/PaginatorEl";
import "./MainPage.css";

export default class MovieApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: null,
      currentPage: 1,
      movieList: null,
      error: false,
      loading: false,
    };
  }

  errorHandler = () => {
    this.setState({ error: true, loading: false });
  };

  loadingHandler = () => {
    this.setState({ loading: true });
  };

  responseHandler = (movieList, totalPages) => {
    this.setState({ movieList, totalPages, loading: false });
  };

  // eslint-disable-next-line class-methods-use-this
  onRateClick = (estimation, index) => {
    console.log(estimation, index);
  };

  onPaginatorChangeHandler = (value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { movieList, totalPages, currentPage, error, loading } = this.state;
    const { RateChangeHandler } = this.props;
    const { onPaginatorChangeHandler, onRateClick } = this;

    function errorCheck() {
      const errIndicator = error ? <AlertComponent /> : null;
      return errIndicator;
    }

    function loadingCheck() {
      const spinner = loading ? <Spinner /> : null;
      return spinner;
    }

    function movieListHandler() {
      const movieListWrapper =
        error || loading || !movieList ? null : (
          <>
            <section className="cardWrapper">
              <MovieListWrapper
                MovieList={movieList}
                RateChangeHandler={RateChangeHandler}
                onRateClick={onRateClick}
              />
            </section>
            <PaginationEl
              onPaginatorChangeHandler={onPaginatorChangeHandler}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </>
        );
      return movieListWrapper;
    }

    return (
      <section className="mainSection">
        <Searcher
          responseHandler={this.responseHandler}
          currentPage={currentPage}
          errorHandler={this.errorHandler}
          loadingHandler={this.loadingHandler}
        />

        {movieListHandler()}
        {errorCheck()}
        {loadingCheck()}
      </section>
    );
  }
}
MovieApp.propTypes = {
  RateChangeHandler: PropTypes.func.isRequired,
};
