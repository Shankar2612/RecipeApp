import React, { useState } from "react";
import "../Styles/Login.scss";
import loginImg from "../Images/loginImg.jpg";
import InputComponent from "../Components/InputComponent";
import Input from "../Components/Input";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import {
  setLoginEmail,
  setLoginFieldsDefault,
  setLoginPassword,
  setToken,
} from "../Redux/actions";
import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import { inputChecks } from "../Utils/inputChecks";
import PasswordEyeClose from "../Components/Icons Component/PasswordEyeClose";
import PasswordEyeOpen from "../Components/Icons Component/PasswordEyeOpen";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  password: state.loginReducer.password,
  token: state.loginReducer.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEmail: (email) => dispatch(setLoginEmail(email)),
    onSetPassword: (password) => dispatch(setLoginPassword(password)),
    onSetToken: () => dispatch(setToken()),
    onResetFields: () => dispatch(setLoginFieldsDefault()),
  };
};

const Login = (props) => {
  const {
    email,
    password,
    onSetEmail,
    onSetPassword,
    onResetFields,
    onSetToken,
  } = props;
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userFound = () => {
    const registeredEmail = window.localStorage.getItem("email");
    const registeredPassword = window.localStorage.getItem("password");

    if (
      registeredEmail === email &&
      bcrypt.compareSync(password, registeredPassword)
    ) {
      //user data found and can be successfully logged in
      return true;
    } else {
      return false;
    }
  };

  const handleNext = (data) => {
    // console.log(data);

    //all validation passed
    //checking if the email and password is present in the DB/localstorage

    if (userFound()) {
      //store a token in the session storage
      alert("Welcome Back!");
      onSetToken();

      //navigating user to all recipes page
      navigate("/");
      onResetFields();
    } else {
      //Invalid Email or Password
      alert("Invalid Email or Password!");
    }
  };

  // console.log(props.token);

  return (
    <div className="login-main-cont">
      <div className="login-card">
        <div className="login-img-cont">
          <img
            className="login-img"
            src={loginImg}
            alt="login-img"
            loading={"lazy"}
          />
        </div>
        <form className="login-form-cont" onSubmit={handleSubmit(handleNext)}>
          <header>
            <p className="salutation">👋</p>
            <p className="welcome-back">Welcome Back!</p>
            <p className="welcome-msg">Let's cook something new today.</p>
          </header>
          <main>
            <InputComponent title={"E-mail"}>
              <Input
                type={"email"}
                value={email}
                name={"email"}
                register={register}
                setValue={(email) => onSetEmail(email)}
              />
              {errors.email ? (
                <ErrorMessage message={errors.email.message} />
              ) : null}
            </InputComponent>
            <InputComponent title={"Password"}>
              <div className="password-input-cont">
                <input
                  className="password-input-field"
                  type={passwordType}
                  name={"password"}
                  value={password}
                  // {...register("password", inputChecks("password", "password"))}
                  onChange={(e) => onSetPassword(e.target.value)}
                />
                {passwordType === "password" ? (
                  <div onClick={() => setPasswordType("text")}>
                    <PasswordEyeClose />
                  </div>
                ) : (
                  <div onClick={() => setPasswordType("password")}>
                    <PasswordEyeOpen />
                  </div>
                )}
              </div>
              {/* {errors.password ? (
                <ErrorMessage message={errors.password.message} />
              ) : null} */}
            </InputComponent>
          </main>
          <div className="login-btn-cont">
            <Button
              title={"Sign in"}
              style={{
                color: "white",
                backgroundColor: "#38c172",
                width: "70%",
              }}></Button>
          </div>
          <p className="already-loggedin-text">
            New to App? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
