import PropTypes from "prop-types";
import { Rate } from "antd";
import Tags from "../Tags/Tags";
import RateIndex from "../RateIndex/RateIndex";

function CreateCard({ movieData }) {
  return (
    <li>
      <div className="movieCard">
        <img
          className="cardImage"
          src={
            movieData.imgLink
              ? `https://image.tmdb.org/t/p/w500${movieData.imgLink}`
              : "https://i.ytimg.com/vi/tQnYVnH4g-k/hqdefault.jpg"
          }
          alt="Movie"
        />
        <div className="cardDescription">
          <img
            className="cardImageMobile"
            src={
              movieData.imgLink
                ? `https://image.tmdb.org/t/p/w500${movieData.imgLink}`
                : "https://i.ytimg.com/vi/tQnYVnH4g-k/hqdefault.jpg"
            }
            alt="Movie"
          />
          <h3 className="cardDescription_title">{movieData.title}</h3>
          <RateIndex RateValue={movieData.rating} />
          <p className="releaseDate">{movieData.releaseDate}</p>
          <Tags genres={movieData.genre} />
          <p>{movieData.description}</p>
          <Rate allowHalf value={movieData.personalEstimate} count={10} />
        </div>
      </div>
    </li>
  );
}

CreateCard.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imgLink: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    genre: PropTypes.arrayOf(PropTypes.number).isRequired,
    personalEstimate: PropTypes.number.isRequired,
  }).isRequired,
};

export default CreateCard;
