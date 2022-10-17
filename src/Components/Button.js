import React from "react";
import "../Styles/Button.scss";

const Button = (props) => {
  const { callback, style, children, title } = props;

  return (
    <button
      onClick={callback ? callback : null}
      style={style ? style : null}
      className="button-component">
      {children} {title}
    </button>
  );
};

export default Button;
