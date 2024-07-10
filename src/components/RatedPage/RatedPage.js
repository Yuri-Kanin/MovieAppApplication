/* eslint-disable global-require */
import { Component } from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";
import CreateCard from "../CreateCard/CreateCard";
import Spinner from "../Spinner/spinner";

class RatedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { RatingList } = this.props;
    if (prevProps.RatingList !== RatingList) {
      this.setState({ loading: false });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createRatingList = (array) => {
    const uniqueKey = require("unique-key");
    const newRatingList = array.map((movieData) => (
      <CreateCard key={uniqueKey()} movieData={movieData} />
    ));
    return newRatingList;
  };

  onPaginatorChangeHandler = (value) => {
    const { onPaginatorChangeHandler } = this.props;
    this.setState({ currentPage: value, loading: true });
    onPaginatorChangeHandler(value);
  };

  render() {
    const { RatingList } = this.props;
    const { Data, totalPages } = RatingList;

    const { currentPage, loading } = this.state;
    const { onPaginatorChangeHandler } = this;

    const readyCheck = () => {
      const movie = !loading ? (
        <>
          <section className="cardWrapper">
            <ul className="movieList">{this.createRatingList(Data)}</ul>
          </section>

          <Pagination
            defaultCurrent={currentPage}
            total={totalPages * 10}
            onChange={(numberPage) => {
              onPaginatorChangeHandler(numberPage);
            }}
          />
        </>
      ) : null;
      return movie;
    };

    function loadingCheck() {
      const spinner = loading ? <Spinner /> : null;
      return spinner;
    }

    return (
      <section className="mainSection">
        {loadingCheck()}
        {readyCheck()}
      </section>
    );
  }
}

RatedPage.propTypes = {
  RatingList: PropTypes.shape({
    Data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imgLink: PropTypes.string,
        releaseDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    ),

    totalPages: PropTypes.number.isRequired,
  }).isRequired,

  onPaginatorChangeHandler: PropTypes.func.isRequired,
};

export default RatedPage;
