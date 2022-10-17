import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

const LoginProtected = (props) => {
  const { token } = props;

  return token.length > 0 ? props.children : <Navigate to={"/login"} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginProtected);
