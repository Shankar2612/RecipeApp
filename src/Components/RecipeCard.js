import React, { useState } from "react";
import "../Styles/RecipeCard.scss";
import Button from "./Button";
import FavouriteFilledIcon from "./Icons Component/FavouriteFilledIcon";
import FavouriteOutlinedIcon from "./Icons Component/FavouriteOutlinedIcon";
import { connect } from "react-redux";
import {
  editSelectedRecipe,
  setCreateEditFlag,
  setCreateRecipePopup,
  setFavourite,
} from "../Redux/actions";

const mapStateToProps = (state) => ({
  selectedRecipe: state.recipesReducer.selectedRecipe,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onEditSelectedRecipe: (recipe) => dispatch(editSelectedRecipe(recipe)),
    onSetFavourite: (id, flag) => dispatch(setFavourite(id, flag)),
    onSetCreateRecipePopup: (flag) => dispatch(setCreateRecipePopup(flag)),
    onSetCreateEditFlag: (flag) => dispatch(setCreateEditFlag(flag)),
  };
};

const RecipeCard = (props) => {
  const { id, name, description, img, ingredients, is_favourite } =
    props.details;
  const [seeMore, setSeeMore] = useState(false);

  const getIngredients = (items, start, end) => {
    return items.map((item, index) => {
      if (index >= start && index < end) {
        return (
          <p key={item.id} className="recipe-card-ingredients">
            {item.name} - {item.value} {item.unit}
          </p>
        );
      }
    });
  };

  const handleOpenPopup = () => {
    //open the create recipe popup
    props.onSetCreateRecipePopup(true);

    //set selected recipe to current recipe details
    props.onEditSelectedRecipe(props.details);

    //set create recipe flag to false because we are editing it now
    props.onSetCreateEditFlag(false);
  };

  return (
    <div className="recipe-card-cont">
      <div className="recipe-img-cont">
        <img
          className="recipe-card-img"
          src={img}
          alt={name}
          loading={"lazy"}
        />
        <div className="favourite-icon-cont">
          {is_favourite ? (
            <div
              onClick={() => props.onSetFavourite(id, false)}
              className="favourite-filled-cont">
              <FavouriteFilledIcon />
            </div>
          ) : (
            <div
              onClick={() => props.onSetFavourite(id, true)}
              className="favourite-outlined-cont">
              <FavouriteOutlinedIcon />
            </div>
          )}
        </div>
      </div>
      <section className="recipe-card-details-cont">
        <p className="recipe-card-name">{name}</p>
        <p className="recipe-card-description">
          {description.substring(0, 100)}...
        </p>
        <p className="recipe-card-ingredient-title">Ingredients</p>
        {getIngredients(ingredients, 0, 2)}
        {seeMore ? getIngredients(ingredients, 2, ingredients.length) : null}
        {ingredients.length > 2 ? (
          seeMore ? (
            <button onClick={() => setSeeMore(false)} className="see-more-btn">
              See Less
            </button>
          ) : (
            <button onClick={() => setSeeMore(true)} className="see-more-btn">
              See More
            </button>
          )
        ) : null}
        <div className="recipe-edit-btn-cont">
          <Button
            title={"Edit"}
            callback={handleOpenPopup}
            style={{
              color: "white",
              backgroundColor: "#38c172",
              fontSize: "14px",
            }}></Button>
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
