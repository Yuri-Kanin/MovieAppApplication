import PropTypes from "prop-types";
import "./RateIndex.css";

function RateIndex({ RateValue }) {
  let rateClassName = "rate";

  if (RateValue < 7) rateClassName = "rate low";
  if (RateValue < 5) rateClassName = "rate very-low";
  if (RateValue < 3) rateClassName = "rate minimal";

  return <span className={rateClassName}>{RateValue.toFixed(1)}</span>;
}
RateIndex.propTypes = {
  RateValue: PropTypes.number.isRequired,
};

export default RateIndex;
