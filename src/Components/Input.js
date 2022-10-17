import React from "react";
import "../Styles/Input.scss";
import { inputChecks } from "../Utils/inputChecks";

const Input = (props) => {
  const { type, name, placeholder, value, setValue } = props;
  return (
    <input
      className="input-field"
      type={type}
      name={name}
      placeholder={placeholder ? placeholder : ""}
      value={value}
      {...props.register(name, inputChecks(type, name))}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
