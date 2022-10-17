import React from "react";
import "../Styles/InputComponent.scss";
import Input from "./Input";

const InputComponent = (props) => {
  const { title, children } = props;
  return (
    <div className="input-component">
      <p className="input-component-title">{title}</p>
      {children}
    </div>
  );
};

export default InputComponent;
