import React, { useState } from "react";
import "../Styles/Register.scss";
import { useForm } from "react-hook-form";
import loginImg from "../Images/loginImg.jpg";
import { connect } from "react-redux";
import InputComponent from "../Components/InputComponent";
import Input from "../Components/Input";
import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Button";
import {
  setRegisterEmail,
  setRegisterFieldsDefault,
  setRegisterFirstname,
  setRegisterLastname,
  setRegisterPassword,
} from "../Redux/actions";
import { inputChecks } from "../Utils/inputChecks";
import PasswordEyeClose from "../Components/Icons Component/PasswordEyeClose";
import PasswordEyeOpen from "../Components/Icons Component/PasswordEyeOpen";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  firstname: state.registerReducer.firstname,
  lastname: state.registerReducer.lastname,
  email: state.registerReducer.email,
  password: state.registerReducer.password,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetFirstname: (firstname) => dispatch(setRegisterFirstname(firstname)),
    onSetLastname: (lastname) => dispatch(setRegisterLastname(lastname)),
    onSetEmail: (email) => dispatch(setRegisterEmail(email)),
    onSetPassword: (password) => dispatch(setRegisterPassword(password)),
    onResetFields: () => dispatch(setRegisterFieldsDefault()),
  };
};

const Register = (props) => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const {
    firstname,
    lastname,
    email,
    password,
    onSetFirstname,
    onSetLastname,
    onSetEmail,
    onSetPassword,
    onResetFields,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userRegistered = () => {
    const registeredEmail = window.localStorage.getItem("email");

    if (registeredEmail === email) {
      //this user/email is already registered
      return true;
    } else {
      return false;
    }
  };

  const handleNext = (data) => {
    // console.log(data);

    //all fields validated, we can now check whether the user/email is registered or not
    //if the user/email is registered then alert him to login otherwise create a new registration

    if (userRegistered()) {
      alert("The Email is already registered, please login to continue");
      return;
    }

    //hashing the password before storing in local storage

    const salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    // console.log(password, hash);

    window.localStorage.setItem("firstname", firstname);
    window.localStorage.setItem("lastname", lastname);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("password", hashedPassword);

    alert("You have successfully registered!");

    //redirecting the user to login page on successfull register
    onResetFields();
    navigate("/login");
  };

  return (
    <div className="register-main-cont">
      <div className="register-card">
        <div className="register-img-cont">
          <img
            className="register-img"
            src={loginImg}
            alt="register-img"
            loading={"lazy"}
          />
        </div>
        <form
          className="register-form-cont"
          onSubmit={handleSubmit(handleNext)}>
          <header>
            <p className="welcome-back">Register</p>
            <p className="welcome-msg">Join with us for amazing recipes.</p>
          </header>
          <main>
            <InputComponent title={"First Name"}>
              <Input
                type={"text"}
                value={firstname}
                name={"firstname"}
                register={register}
                setValue={(name) => onSetFirstname(name)}
              />
              {errors.firstname ? (
                <ErrorMessage message={errors.firstname.message} />
              ) : null}
            </InputComponent>
            <InputComponent title={"Last Name"}>
              <Input
                type={"text"}
                value={lastname}
                name={"lastname"}
                register={register}
                setValue={(name) => onSetLastname(name)}
              />
              {errors.lastname ? (
                <ErrorMessage message={errors.lastname.message} />
              ) : null}
            </InputComponent>
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
                  {...register("password", inputChecks("password", "password"))}
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
              {errors.password ? (
                <ErrorMessage message={errors.password.message} />
              ) : null}
            </InputComponent>
          </main>
          <div className="register-btn-cont">
            <Button
              title={"Register"}
              style={{
                color: "white",
                backgroundColor: "#38c172",
                width: "70%",
              }}></Button>
          </div>
          <p className="already-registered-text">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
