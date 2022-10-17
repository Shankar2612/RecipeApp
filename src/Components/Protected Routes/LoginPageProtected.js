import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

const LoginPageProtected = (props) => {
  const { token } = props;
  //   console.log(token);

  return token.length === 0 ? props.children : <Navigate to={"/"} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageProtected);
