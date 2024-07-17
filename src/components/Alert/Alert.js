/* eslint-disable global-require */
import PropTypes from "prop-types";
import { Alert } from "antd";
import "./Alert.css";

function AlertComponent({ message }) {
  const uniqueKey = require("unique-key");
  return (
    <ul className="alert">
      <li key={uniqueKey()}>
        <Alert message="Error" description={message} type="error" showIcon />
      </li>
    </ul>
  );
}

AlertComponent.propTypes = { message: PropTypes.string.isRequired };

export default AlertComponent;
