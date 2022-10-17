import React from "react";
import "../Styles/ErrorMessage.scss";

const ErrorMessage = (props) => {
  const { message } = props;

  return <p className="error-text">{message}</p>;
};

export default ErrorMessage;
