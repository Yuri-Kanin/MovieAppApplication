import { Component } from "react";
import PropTypes from "prop-types";
import Searcher from "../Searcher/Searcher";
import CardWrapper2 from "../CardWrapper(don't use)/CardWrapper2";
import PaginationEl from "../PaginatorEl/PaginatorEl";
import "./MainPage.css";

export default class MovieApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 1,
      currentPage: 1,
      searchWord: null,
    };
  }

  render() {
    const { currentPage, searchWord, totalPages } = this.state;
    const { RateChangeHandler } = this.props;

    const SearcherHandler = (value) => {
      this.setState({ searchWord: value });
    };

    const onPaginatorChangeHandler = (value) => {
      this.setState({ currentPage: value });
    };

    const totalPageCount = (totalPage) => {
      this.setState({ totalPages: totalPage });
    };

    return (
      <section className="mainSection">
        <Searcher SearcherHandler={(value) => SearcherHandler(value)} />
        {searchWord ? (
          <>
            <CardWrapper2
              currentPage={currentPage}
              searchWord={searchWord}
              RateChangeHandler={RateChangeHandler}
              totalPageCount={totalPageCount}
            />
            <PaginationEl
              onPaginatorChangeHandler={(el) => onPaginatorChangeHandler(el)}
              totalPages={totalPages}
            />
          </>
        ) : null}
      </section>
    );
  }
}
MovieApp.propTypes = {
  RateChangeHandler: PropTypes.func.isRequired,
};
