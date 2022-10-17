import recipes from "../Data/recipes.json";
import * as actionTypes from "./actionTypes";
import uniqid from "uniqid";

const initialRecipesState = {
  recipes: recipes.recipes,
  selectedRecipe: {
    id: uniqid(),
    img: "",
    name: "",
    description: "",
    is_favourite: false,
    ingredients: [
      {
        id: 10,
        name: "",
        value: "",
        unit: "",
      },
    ],
  },
};

const initialPopupsState = {
  createRecipePopup: false,
};

const initialFlagsState = {
  createEditFlag: false,
};

const initialLoginAuthState = {
  email: "",
  password: "",
  token: window.sessionStorage.getItem("token")
    ? window.sessionStorage.getItem("token")
    : "",
};

const initialRegisterAuthState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

export const recipesReducer = (state = initialRecipesState, action) => {
  switch (action.type) {
    case actionTypes.EDITSELECTEDRECIPE:
      return {
        ...state,
        selectedRecipe: action.payload,
      };
    case actionTypes.SETSELECTEDRECIPEDEFAULT:
      return {
        ...state,
        selectedRecipe: {
          id: uniqid(),
          img: "",
          name: "",
          description: "",
          is_favourite: false,
          ingredients: [
            {
              id: 10,
              name: "",
              value: "",
              unit: "",
            },
          ],
        },
      };
    case actionTypes.CREATERECIPE:
      var newRecipes = [...state.recipes];
      newRecipes.push(action.payload);

      return {
        ...state,
        recipes: newRecipes,
      };
    case actionTypes.EDITRECIPE:
      var newRecipes = state.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          return action.payload;
        } else return recipe;
      });

      return {
        ...state,
        recipes: newRecipes,
      };
    case actionTypes.DELETERECIPE:
      var newRecipes = state.recipes.filter(
        (recipe) => recipe.id != action.payload
      );

      return {
        ...state,
        recipes: newRecipes,
      };
    case actionTypes.SETFAVOURITE:
      var newRecipes = state.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          return { ...recipe, is_favourite: action.payload.value };
        } else return recipe;
      });

      return {
        ...state,
        recipes: newRecipes,
      };
    default:
      return state;
  }
};

export const popupsReducer = (state = initialPopupsState, action) => {
  switch (action.type) {
    case actionTypes.SETCREATERECIPEPOPUP:
      return {
        ...state,
        createRecipePopup: action.payload,
      };
    default:
      return state;
  }
};

export const flagsReducer = (state = initialFlagsState, action) => {
  switch (action.type) {
    case actionTypes.SETCREATEEDITFLAG:
      return {
        ...state,
        createEditFlag: action.payload,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = initialLoginAuthState, action) => {
  switch (action.type) {
    case actionTypes.SETLOGINEMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SETLOGINPASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.SETTOKEN:
      const token = uniqid();
      window.sessionStorage.setItem("token", token);

      return {
        ...state,
        token: token,
      };
    case actionTypes.DELETETOKEN:
      window.sessionStorage.removeItem("token");
      return {
        ...state,
        token: "",
      };
    case actionTypes.SETLOGINFIELDSDEFAULT:
      return { ...state, email: "", password: "" };
    default:
      return state;
  }
};

export const registerReducer = (state = initialRegisterAuthState, action) => {
  switch (action.type) {
    case actionTypes.SETREGISTERFIRSTNAME:
      return { ...state, firstname: action.payload };
    case actionTypes.SETREGISTERLASTNAME:
      return { ...state, lastname: action.payload };
    case actionTypes.SETREGISTEREMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SETREGISTERPASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.SETREGISTERFIELDSDEFAULT:
      return { ...state, firstname: "", lastname: "", email: "", password: "" };
    default:
      return state;
  }
};
