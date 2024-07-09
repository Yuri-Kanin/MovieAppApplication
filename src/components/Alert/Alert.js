/* eslint-disable global-require */
import { Alert } from "antd";

function AlertComponent() {
  const uniqueKey = require("unique-key");
  return (
    <ul style={{ marginTop: "20px" }}>
      <li key={uniqueKey()}>
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
      </li>
    </ul>
  );
}

export default AlertComponent;
