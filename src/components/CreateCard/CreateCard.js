import PropTypes from "prop-types";
import { Rate } from "antd";
import Tags from "../Tags/Tags";
import RateIndex from "../RateIndex/RateIndex";
import "./CreateCard.css";
import "./Description.css";

function CreateCard({ movieData, RateChangeHandler }) {
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
          <h3 className="cardDescription_title">{movieData.title}</h3>
          <RateIndex RateValue={movieData.rating} />
          <p style={{ color: "#827E7E" }}>{movieData.releaseDate}</p>
          <Tags genres={movieData.genre} />
          <p>{movieData.description}</p>
          <Rate
            allowHalf
            defaultValue={movieData.personalEstimate}
            count={10}
            style={{ fontSize: "14px" }}
            onChange={(estimation) =>
              RateChangeHandler(estimation, movieData.id)
            }
          />
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
  RateChangeHandler: PropTypes.func.isRequired,
};

export default CreateCard;
