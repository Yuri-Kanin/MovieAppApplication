/* eslint-disable no-unused-vars */
import { Spin } from "antd";
import "./spinner.css";

function Spinner() {
  // eslint-disable-next-line global-require
  const uniqueKey = require("unique-key");

  return (
    <ul className="movieList">
      {[...Array(20)].map((_) => (
        <li key={uniqueKey()} className="spinner">
          <Spin size="large" />
        </li>
      ))}
    </ul>
  );
}
export default Spinner;
