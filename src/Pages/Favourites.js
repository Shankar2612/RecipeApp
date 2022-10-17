import React from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Favourites.scss";
import { connect } from "react-redux";
import { setCreateEditFlag, setCreateRecipePopup } from "../Redux/actions";
import BlackScreen from "../Components/BlackScreen";
import CreateRecipePopup from "../Components/CreateRecipePopup";
import RecipeCard from "../Components/RecipeCard";
import NoFavouriteIcon from "../Components/Icons Component/NoFavouriteIcon";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
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

const Favourites = (props) => {
  const {
    recipes,
    onSetCreateEditFlag,
    onSetCreateRecipePopup,
    createRecipePopup,
    createEditFlag,
  } = props;

  const favouriteRecipes = recipes.filter(
    (recipe) => recipe.is_favourite === true
  );

  // console.log(recipes, favouriteRecipes);

  return (
    <div className="favourites-main-cont">
      <Navbar
        setCreateRecipe={onSetCreateEditFlag}
        setCreateRecipePopup={onSetCreateRecipePopup}
      />
      <section className="favourites-cont">
        <h1 className="favourites-title">Favourite Recipes</h1>
        {favouriteRecipes.length > 0 ? (
          <div className="favourites-cards-cont">
            {favouriteRecipes.map((recipe) => {
              return <RecipeCard details={recipe} key={recipe.id} />;
            })}
          </div>
        ) : (
          <div className="empty-favourites-cont">
            <div className="no-favourite-icon-cont">
              <NoFavouriteIcon />
            </div>
            <p className="no-favourites-text">
              You do not have any Favourite Recipes yet. Explore to make some.
            </p>
            <Link className="explore-recipes-link" to="/">
              <Button
                title={"Explore Recipes"}
                callback={null}
                style={{
                  color: "white",
                  backgroundColor: "#38c172",
                }}></Button>
            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
