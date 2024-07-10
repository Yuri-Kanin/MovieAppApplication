/* eslint-disable global-require */
import PropTypes from "prop-types";
import { Alert } from "antd";

function AlertComponent({ message }) {
  const uniqueKey = require("unique-key");
  return (
    <ul style={{ marginTop: "20px" }}>
      <li key={uniqueKey()}>
        <Alert message="Error" description={message} type="error" showIcon />
      </li>
    </ul>
  );
}

AlertComponent.propTypes = { message: PropTypes.string.isRequired };

export default AlertComponent;
