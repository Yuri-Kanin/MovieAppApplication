import PropTypes from "prop-types";
import "./RateIndex.css";

function RateIndex({ RateValue }) {
  const RateIdxStyle = {
    borderColor: "#66E900",
  };

  if (RateValue < 7) RateIdxStyle.borderColor = "#E9D100";
  if (RateValue < 5) RateIdxStyle.borderColor = "#E97E00";
  if (RateValue < 3) RateIdxStyle.borderColor = "#E90000";

  return (
    <span style={RateIdxStyle} className="rate">
      {RateValue.toFixed(1)}
    </span>
  );
}
RateIndex.propTypes = {
  RateValue: PropTypes.number.isRequired,
};

export default RateIndex;
