import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/MenuSliderCard.scss";
import Button from "./Button";
import AddIcon from "./Icons Component/AddIcon";
import CloseIcon from "./Icons Component/CloseIcon";

const MenuSliderCard = (props) => {
  const location = useLocation();

  return (
    <div
      style={{ transform: `translateX(${props.translate}%)` }}
      className="menu-card-slider-cont">
      <div className="close-icon-cont">
        <div onClick={() => props.setTranslate(120)} className="close-icon">
          <CloseIcon />
        </div>
      </div>
      <div className="btn-cont">
        <Button
          title={"Create Recipe"}
          callback={() => {
            props.onSetCreateRecipePopup(true);
            props.onSetCreateEditFlag(true);
            props.setTranslate(120);
          }}
          style={{
            marginRight: "25px",
            color: "white",
            backgroundColor: "#38c172",
          }}>
          <AddIcon />
        </Button>
      </div>
      {location.pathname === "/favourites" ? (
        <Link
          onClick={() => props.setTranslate(120)}
          className="favourites-link"
          to="/">
          <Button
            title={"Recipes"}
            callback={null}
            style={{
              marginRight: "25px",
            }}></Button>
        </Link>
      ) : (
        <Link
          onClick={() => props.setTranslate(120)}
          className="favourites-link"
          to="/favourites">
          <Button
            title={"Favourites"}
            callback={null}
            style={{
              marginRight: "25px",
            }}></Button>
        </Link>
      )}
      <Button callback={props.handleLogout} title={"Logout"}></Button>
    </div>
  );
};

export default MenuSliderCard;
