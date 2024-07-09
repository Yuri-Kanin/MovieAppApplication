/* eslint-disable global-require */
import PropTypes from "prop-types";
import { Rate } from "antd";
import Tags from "../Tags/Tags";
import RateIndex from "../RateIndex/RateIndex";
import "./MovieListWrapper.css";

function MovieListWrapper({ MovieList, RateChangeHandler, onRateClick }) {
  const uniqueKey = require("unique-key");

  function createMovieList(array) {
    const MovieListChanged = array.map((oneOfTheMovie, index) => (
      <li key={uniqueKey()}>
        <div className="movieCard">
          <img
            className="cardImage"
            src={
              oneOfTheMovie.imgLink
                ? `https://image.tmdb.org/t/p/w500${oneOfTheMovie.imgLink}`
                : "https://i.ytimg.com/vi/tQnYVnH4g-k/hqdefault.jpg"
            }
            alt="Movie"
          />
          <div className="cardDescription">
            <h3 className="cardDescription_title">{oneOfTheMovie.title}</h3>
            <RateIndex RateValue={oneOfTheMovie.rating} />
            <p style={{ color: "#827E7E" }}>{oneOfTheMovie.releaseDate}</p>
            <Tags genres={oneOfTheMovie.genre} />
            <p>{oneOfTheMovie.description}</p>
            <Rate
              allowHalf
              defaultValue={oneOfTheMovie.personalEstimate}
              count={10}
              style={{ fontSize: "14px" }}
              onChange={(estimation) => {
                RateChangeHandler(estimation, oneOfTheMovie.id);
                onRateClick(estimation, index);
              }}
            />
          </div>
        </div>
      </li>
    ));

    return MovieListChanged;
  }

  return <ul className="movieList">{createMovieList(MovieList)}</ul>;
}

MovieListWrapper.propTypes = {
  MovieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      imgLink: PropTypes.string,
      releaseDate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      genre: PropTypes.arrayOf(PropTypes.number).isRequired,
      personalEstimate: PropTypes.number.isRequired,
    })
  ).isRequired,
  RateChangeHandler: PropTypes.func.isRequired,
  onRateClick: PropTypes.func.isRequired,
};

export default MovieListWrapper;
