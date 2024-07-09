/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import "./Navigation.css";

function Navigation({ isRatedClicked, onChangePageHandler }) {
  function isRating() {
    if (isRatedClicked) {
      return "navigation_text navigation_active";
    }
    return "navigation_text";
  }
  function isSearch() {
    if (!isRatedClicked) {
      return "navigation_text navigation_active";
    }
    return "navigation_text";
  }

  return (
    <div className="navigation" onClick={onChangePageHandler}>
      <span className={isSearch()}>Search</span>
      <span className={isRating()}>Rated</span>
    </div>
  );
}
Navigation.propTypes = {
  isRatedClicked: PropTypes.bool.isRequired,
  onChangePageHandler: PropTypes.func.isRequired,
};
export default Navigation;
