import React from "react";
import "../Styles/TextArea.scss";
import { inputChecks } from "../Utils/inputChecks";

const TextArea = (props) => {
  const { value, name, type, setValue } = props;
  return (
    <textarea
      className="text-area"
      value={value}
      name={name}
      {...props.register(name, inputChecks(type, name))}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextArea;
