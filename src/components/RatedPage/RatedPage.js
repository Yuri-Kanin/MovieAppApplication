import PropTypes from "prop-types";
import CreateCard from "../CreateCard/CreateCard";

function RatedPage({ RatingList }) {
  function createRatingList(array) {
    const newRatingList = array.map((movieData) => (
      <CreateCard
        key={movieData.id}
        movieData={movieData}
        RateChangeHandler={() => {}}
      />
    ));
    return newRatingList;
  }

  return (
    <section className="mainSection">
      <section className="cardWrapper">
        <ul className="movieList">{createRatingList(RatingList)}</ul>
      </section>
    </section>
  );
}

RatedPage.propTypes = {
  RatingList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      imgLink: PropTypes.string,
      releaseDate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RatedPage;
