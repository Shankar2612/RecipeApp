import React, { useState } from "react";
import "../Styles/Navbar.scss";
import AddIcon from "./Icons Component/AddIcon";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteToken,
  setCreateEditFlag,
  setCreateRecipePopup,
} from "../Redux/actions";
import MenuIcon from "./Icons Component/MenuIcon";
import MenuSliderCard from "./MenuSliderCard";

const mapStateToProps = (state) => ({
  createRecipePopup: state.popupsReducer.createRecipePopup,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCreateRecipePopup: (flag) => dispatch(setCreateRecipePopup(flag)),
    onSetCreateEditFlag: (flag) => dispatch(setCreateEditFlag(flag)),
    onDeleteToken: () => dispatch(deleteToken()),
  };
};

const Navbar = (props) => {
  const location = useLocation();
  // const translateValue = "translateX(-120%)";
  const [translate, setTranslate] = useState(120);

  const { onSetCreateRecipePopup, onSetCreateEditFlag, onDeleteToken } = props;

  // console.log(location);

  const handleLogout = () => {
    //logout the user
    onDeleteToken();
    alert("You are successfully logged out!");
    setTranslate(120);
  };

  return (
    <header className="navbar-cont">
      <p className="logo">Recipe.</p>
      <div className="create-recipe-logout-cont">
        <Button
          title={"Create Recipe"}
          callback={() => {
            onSetCreateRecipePopup(true);
            onSetCreateEditFlag(true);
          }}
          style={{
            marginRight: "25px",
            color: "white",
            backgroundColor: "#38c172",
          }}>
          <AddIcon />
        </Button>
        {location.pathname === "/favourites" ? (
          <Link className="favourites-link" to="/">
            <Button
              title={"Recipes"}
              callback={null}
              style={{
                marginRight: "25px",
              }}></Button>
          </Link>
        ) : (
          <Link className="favourites-link" to="/favourites">
            <Button
              title={"Favourites"}
              callback={null}
              style={{
                marginRight: "25px",
              }}></Button>
          </Link>
        )}
        <Button callback={handleLogout} title={"Logout"}></Button>
      </div>
      <div onClick={() => setTranslate(0)} className="menu-icon-cont">
        <MenuIcon />
      </div>
      <MenuSliderCard
        onSetCreateRecipePopup={onSetCreateRecipePopup}
        onSetCreateEditFlag={onSetCreateEditFlag}
        handleLogout={handleLogout}
        translate={translate}
        setTranslate={setTranslate}
      />
    </header>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
