import React, { useState } from "react";
import "../Styles/Recipes.scss";
// import recipes from "../Data/recipes.json";
import Navbar from "../Components/Navbar";
import RecipeCard from "../Components/RecipeCard";
import { connect } from "react-redux";
import CreateRecipePopup from "../Components/CreateRecipePopup";
import BlackScreen from "../Components/BlackScreen";
import { setCreateEditFlag, setCreateRecipePopup } from "../Redux/actions";
import NoRecipeIcon from "../Components/Icons Component/NoRecipeIcon";
import Footer from "../Components/Footer";

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
  createRecipePopup: state.popupsReducer.createRecipePopup,
  createEditFlag: state.flagsReducer.createEditFlag,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCreateRecipePopup: (flag) => dispatch(setCreateRecipePopup(flag)),
    onSetCreateEditFlag: (flag) => dispatch(setCreateEditFlag(flag)),
  };
};

const Recipes = (props) => {
  const { recipes, createRecipePopup, createEditFlag, onSetCreateRecipePopup } =
    props;

  // console.log(recipes);

  return (
    <div className="recipes-main-cont">
      <Navbar />
      <section className="recipes-cont">
        <h1 className="recipe-title">Recipes</h1>
        {recipes.length > 0 ? (
          <div className="recipes-cards-cont">
            {recipes.map((recipe) => {
              return <RecipeCard details={recipe} key={recipe.id} />;
            })}
          </div>
        ) : (
          <div className="no-recipes-cont">
            <div className="no-recipe-icon-cont">
              <NoRecipeIcon />
            </div>
            <p className="no-recipes-text">
              There are no Recipes. Create some delicious lip smacking recipes.
            </p>
          </div>
        )}
      </section>
      {createRecipePopup ? <BlackScreen /> : null}
      {createRecipePopup ? (
        <CreateRecipePopup
          createRecipe={createEditFlag}
          setCreateRecipePopup={onSetCreateRecipePopup}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
