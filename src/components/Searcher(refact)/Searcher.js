import { Component } from "react";
import PropTypes from "prop-types";
import DebounceInput from "react-debounce-input";
import TheMovieDbService from "../../Service/TheMovieDbService";
import "./Searcher.css";

class Searcher extends Component {
  TheMovieDbServiceDB = new TheMovieDbService();

  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { currentPage } = this.props;
    const { searchWord } = this.state;
    if (prevProps.currentPage !== currentPage) {
      this.handler(currentPage, searchWord);
    }
  }

  async handler(page, word) {
    try {
      const { responseHandler, loadingHandler } = this.props;
      loadingHandler();
      const promise = await this.TheMovieDbServiceDB.getMovies(page, word);
      const { movieList, totalPages } = await promise;
      responseHandler(movieList, totalPages);
    } catch (error) {
      console.log(error);
      const { errorHandler } = this.props;
      errorHandler();
    }
  }

  onInputChangeHandler = (event) => {
    const { currentPage } = this.props;
    this.setState({ searchWord: event.target.value });
    this.handler(currentPage, event.target.value);
  };

  render() {
    const { searchWord } = this.state;

    return (
      <DebounceInput
        minLength={1}
        className="input"
        type="text"
        placeholder="Type to search..."
        debounceTimeout={500}
        onChange={this.onInputChangeHandler}
        value={searchWord}
      />
    );
  }
}

Searcher.propTypes = {
  currentPage: PropTypes.number.isRequired,
  responseHandler: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  loadingHandler: PropTypes.func.isRequired,
};

export default Searcher;
