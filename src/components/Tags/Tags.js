import PropTypes from "prop-types";
import { Tag } from "antd";
import { Consumer } from "../../AppContext/AppContext";

function Tags({ genres }) {
  // eslint-disable-next-line global-require
  const uniqueKey = require("unique-key");

  return (
    <Consumer>
      {(Genres) =>
        genres.map((el) => {
          const newArr = Genres.filter((elem) => elem.id === el);
          return <Tag key={uniqueKey()}>{newArr[0].name}</Tag>;
        })
      }
    </Consumer>
  );
}

Tags.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Tags;
