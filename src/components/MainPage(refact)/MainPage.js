/* eslint-disable react/prop-types */
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

  onPaginatorChangeHandler = (value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { movieList, totalPages, currentPage, error, loading } = this.state;
    const { RateChangeHandler, onRateClick, StarsList } = this.props;

    const { onPaginatorChangeHandler } = this;

    function errorCheck() {
      const errIndicator = error ? (
        <AlertComponent message="Некорректный запрос" />
      ) : null;
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
                MovieList={movieList.map((el) => {
                  if (StarsList[el.id]) {
                    return { ...el, personalEstimate: StarsList[el.id] };
                  }
                  return el;
                })}
                RateChangeHandler={RateChangeHandler}
                onRateClick={onRateClick}
              />
            </section>
            <PaginationEl
              onPaginatorChangeHandler={onPaginatorChangeHandler}
              totalPages={totalPages * 20}
              pageSize={20}
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
  onRateClick: PropTypes.func.isRequired,
};
