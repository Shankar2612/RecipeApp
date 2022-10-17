import React, { useRef, useState } from "react";
import "../Styles/CreateRecipePopup.scss";
import Button from "./Button";
import CloseIcon from "./Icons Component/CloseIcon";
import DeleteIcon from "./Icons Component/DeleteIcon";
import Input from "./Input";
import InputComponent from "./InputComponent";
import TextArea from "./TextArea";
import { connect } from "react-redux";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  editSelectedRecipe,
  setCreateEditFlag,
  setCreateRecipePopup,
  setSelectedRecipeDefault,
} from "../Redux/actions";
import uniqid from "uniqid";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const mapStateToProps = (state) => ({
  selectedRecipe: state.recipesReducer.selectedRecipe,
  createEditFlag: state.flagsReducer.createEditFlag,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onEditSelectedRecipe: (recipe) => dispatch(editSelectedRecipe(recipe)),
    onCreateRecipe: (recipe) => dispatch(createRecipe(recipe)),
    onSetSelectedRecipeDefault: () => dispatch(setSelectedRecipeDefault()),
    onEditRecipe: (recipe) => dispatch(editRecipe(recipe)),
    onDeleteRecipe: (id) => dispatch(deleteRecipe(id)),
    onSetCreateRecipePopup: (flag) => dispatch(setCreateRecipePopup(flag)),
    onSetCreateEditFlag: (flag) => dispatch(setCreateEditFlag(flag)),
  };
};

const CreateRecipePopup = (props) => {
  const inputRef = useRef(null);
  const {
    selectedRecipe,
    onEditSelectedRecipe,
    onDeleteRecipe,
    onSetCreateRecipePopup,
    onSetSelectedRecipeDefault,
    onSetCreateEditFlag,
    createEditFlag,
    onCreateRecipe,
    onEditRecipe,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSetIngredientName = (value, id) => {
    const newIngredients = selectedRecipe.ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, name: value };
      } else {
        return ingredient;
      }
    });

    onEditSelectedRecipe({
      ...selectedRecipe,
      ingredients: newIngredients,
    });
  };

  const handleSetIngredientValue = (value, id) => {
    const newIngredients = selectedRecipe.ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, value: Number(value) };
      } else {
        return ingredient;
      }
    });

    onEditSelectedRecipe({
      ...selectedRecipe,
      ingredients: newIngredients,
    });
  };

  const handleSetIngredientUnit = (value, id) => {
    const newIngredients = selectedRecipe.ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, unit: value };
      } else {
        return ingredient;
      }
    });

    onEditSelectedRecipe({
      ...selectedRecipe,
      ingredients: newIngredients,
    });
  };

  const showAddIngredientsBtn = () => {
    const lastIngredient =
      selectedRecipe.ingredients[selectedRecipe.ingredients.length - 1];

    if (
      selectedRecipe.ingredients.length > 0 &&
      lastIngredient.name.length !== 0 &&
      lastIngredient.value > 0 &&
      lastIngredient.unit.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddIngredient = () => {
    const newIngredients = [...selectedRecipe.ingredients];
    const lastIngredient =
      selectedRecipe.ingredients[selectedRecipe.ingredients.length - 1];

    newIngredients.push({
      id: Number(lastIngredient.id) + 1,
      name: "",
      value: "",
      unit: "",
    });

    onEditSelectedRecipe({
      ...selectedRecipe,
      ingredients: newIngredients,
    });
  };

  const handleDeleteIngredient = (id) => {
    const newIngredients = selectedRecipe.ingredients.filter(
      (ingredient) => ingredient.id != id
    );

    onEditSelectedRecipe({
      ...selectedRecipe,
      ingredients: newIngredients,
    });
  };

  // const handleCreateRecipe = () => {
  //   //creating a recipe
  //   props.onCreateRecipe({ ...props.selectedRecipe, id: uniqid() });

  //   //closing the popup
  //   props.onSetCreateRecipePopup(false);

  //   //setting the selectedRecipe to default
  //   props.onSetSelectedRecipeDefault();

  //   //setting the createEditFlag to false
  //   props.onSetCreateEditFlag(false);
  // };

  // const handleSaveRecipe = () => {
  //   //replacing the new recipe with old in the recipes array
  //   props.onEditRecipe(props.selectedRecipe);

  //   //closing the popup
  //   props.onSetCreateRecipePopup(false);

  //   //setting the selectedRecipe to default
  //   props.onSetSelectedRecipeDefault();

  //   //setting the createEditFlag to false
  //   props.onSetCreateEditFlag(false);
  // };

  const handleDeleteRecipe = (id) => {
    //deleting the recipe
    onDeleteRecipe(id);

    //closing the popup
    onSetCreateRecipePopup(false);

    //setting the selectedRecipe to default
    onSetSelectedRecipeDefault();

    //setting the createEditFlag to false
    onSetCreateEditFlag(false);
  };

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    //setting the image
    onEditSelectedRecipe({
      ...selectedRecipe,
      img: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleNext = (data) => {
    // console.log(data);
    if (selectedRecipe.img.length === 0) {
      alert("No Image Provided!");
    } else {
      if (createEditFlag) {
        //creating a recipe
        onCreateRecipe({ ...selectedRecipe, id: uniqid() });
      } else {
        //replacing the new recipe with old in the recipes array
        onEditRecipe(selectedRecipe);
      }

      //closing the popup
      onSetCreateRecipePopup(false);

      //setting the selectedRecipe to default
      onSetSelectedRecipeDefault();

      //setting the createEditFlag to false
      onSetCreateEditFlag(false);
    }
  };

  // console.log(selectedRecipe, errors);

  return (
    <div className="create-recipe-poupup-card">
      <div className="close-icon-cont">
        <button
          onClick={() => {
            onSetCreateRecipePopup(false);
            onSetSelectedRecipeDefault();
            onSetCreateEditFlag(false);
          }}
          className="close-icon">
          <CloseIcon />
        </button>
      </div>
      {selectedRecipe.img.length > 0 ? (
        <div className="create-recipe-img-cont">
          <img
            className="create-recipe-img"
            src={selectedRecipe.img}
            alt="recipe-img"
            loading={"lazy"}
          />
          <Button
            title={"Upload Image"}
            callback={handleImageUpload}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              backgroundColor: "#38c172",
            }}></Button>
          <input
            ref={inputRef}
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      ) : (
        <div className="create-recipe-no-img-cont">
          <Button
            title={"Upload Image"}
            callback={handleImageUpload}
            style={{
              color: "white",
              backgroundColor: "#38c172",
            }}></Button>
          <input
            ref={inputRef}
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      )}
      <form onSubmit={handleSubmit(handleNext)}>
        <InputComponent title={"Name"}>
          <Input
            type={"text"}
            value={selectedRecipe.name}
            name={"name"}
            register={register}
            setValue={(name) =>
              onEditSelectedRecipe({
                ...selectedRecipe,
                name: name,
              })
            }
          />
          {errors.name ? <ErrorMessage message={errors.name.message} /> : null}
        </InputComponent>
        <InputComponent title={"Description"}>
          <TextArea
            type={"text"}
            value={selectedRecipe.description}
            name={"description"}
            register={register}
            setValue={(description) =>
              onEditSelectedRecipe({
                ...selectedRecipe,
                description: description,
              })
            }
          />
          {errors.description ? (
            <ErrorMessage message={errors.description.message} />
          ) : null}
        </InputComponent>
        <div className="ingredients-list-cont">
          <InputComponent title={"Ingredients"}>
            {selectedRecipe.ingredients.map((ingredient, index) => {
              return (
                <div key={ingredient.id} className="ingredient-list-cont">
                  <p className="ingredient-list-count">{index + 1}.</p>
                  <div className="ingredient-list-values">
                    <div className="ingredient-field-cont">
                      <Input
                        type={"text"}
                        placeholder={"Name"}
                        value={ingredient.name}
                        name={"name" + (index + 1)}
                        register={register}
                        setValue={(name) =>
                          handleSetIngredientName(name, ingredient.id)
                        }
                      />
                      {errors[`name${index + 1}`] ? (
                        <ErrorMessage
                          message={"*" + errors[`name${index + 1}`].type}
                        />
                      ) : null}
                    </div>
                    <div className="ingredient-field-cont">
                      <Input
                        type={"number"}
                        placeholder={"Value"}
                        value={ingredient.value}
                        name={"value" + (index + 1)}
                        register={register}
                        setValue={(value) =>
                          handleSetIngredientValue(value, ingredient.id)
                        }
                      />
                      {errors[`value${index + 1}`] ? (
                        <ErrorMessage
                          message={"*" + errors[`value${index + 1}`].type}
                        />
                      ) : null}
                    </div>
                    <div className="ingredient-field-cont">
                      <Input
                        type={"text"}
                        placeholder={"Unit"}
                        value={ingredient.unit}
                        name={"unit" + (index + 1)}
                        register={register}
                        setValue={(unit) =>
                          handleSetIngredientUnit(unit, ingredient.id)
                        }
                      />
                      {errors[`unit${index + 1}`] ? (
                        <ErrorMessage
                          message={"*" + errors[`unit${index + 1}`].type}
                        />
                      ) : null}
                    </div>
                  </div>
                  {selectedRecipe.ingredients.length === 1 ? null : (
                    <div
                      className="delete-ingredient-icon-cont"
                      onClick={() => handleDeleteIngredient(ingredient.id)}>
                      <DeleteIcon />
                    </div>
                  )}
                </div>
              );
            })}
            {showAddIngredientsBtn() ? (
              <Button
                title={"Add More"}
                callback={handleAddIngredient}
                style={{
                  color: "white",
                  backgroundColor: "#38c172",
                  fontSize: "12px",
                  padding: "4px 10px",
                }}></Button>
            ) : null}
          </InputComponent>
        </div>
        <div className="create-delete-save-btn-cont">
          {!createEditFlag ? (
            <>
              <Button
                title={"Delete"}
                callback={() => handleDeleteRecipe(selectedRecipe.id)}
                style={{
                  color: "white",
                  backgroundColor: "#F54242",
                  marginRight: "10px",
                }}></Button>
              <Button
                title={"Save"}
                // callback={handleSaveRecipe}
                style={{
                  color: "white",
                  backgroundColor: "#38c172",
                }}></Button>
            </>
          ) : (
            <Button
              title={"Create"}
              // callback={handleCreateRecipe}
              style={{
                color: "white",
                backgroundColor: "#38c172",
              }}></Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipePopup);
