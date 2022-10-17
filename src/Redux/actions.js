import * as actionTypes from "./actionTypes";

//popup actions

export const setCreateRecipePopup = (flag) => ({
  type: actionTypes.SETCREATERECIPEPOPUP,
  payload: flag,
});

//flag actions

export const setCreateEditFlag = (flag) => ({
  type: actionTypes.SETCREATEEDITFLAG,
  payload: flag,
});

//recipes actions

export const editSelectedRecipe = (recipe) => ({
  type: actionTypes.EDITSELECTEDRECIPE,
  payload: recipe,
});

export const setSelectedRecipeDefault = () => ({
  type: actionTypes.SETSELECTEDRECIPEDEFAULT,
  payload: null,
});

export const createRecipe = (recipe) => ({
  type: actionTypes.CREATERECIPE,
  payload: recipe,
});

export const editRecipe = (recipe) => ({
  type: actionTypes.EDITRECIPE,
  payload: recipe,
});

export const deleteRecipe = (id) => ({
  type: actionTypes.DELETERECIPE,
  payload: id,
});

export const setFavourite = (id, value) => ({
  type: actionTypes.SETFAVOURITE,
  payload: {
    id: id,
    value: value,
  },
});

//login actions

export const setLoginEmail = (email) => ({
  type: actionTypes.SETLOGINEMAIL,
  payload: email,
});

export const setLoginPassword = (password) => ({
  type: actionTypes.SETLOGINPASSWORD,
  payload: password,
});

export const setToken = () => ({
  type: actionTypes.SETTOKEN,
  payload: null,
});

export const deleteToken = () => ({
  type: actionTypes.DELETETOKEN,
  payload: null,
});

export const setLoginFieldsDefault = () => ({
  type: actionTypes.SETLOGINFIELDSDEFAULT,
  payload: null,
});

//register actions

export const setRegisterFirstname = (firstname) => ({
  type: actionTypes.SETREGISTERFIRSTNAME,
  payload: firstname,
});

export const setRegisterLastname = (lastname) => ({
  type: actionTypes.SETREGISTERLASTNAME,
  payload: lastname,
});

export const setRegisterEmail = (email) => ({
  type: actionTypes.SETREGISTEREMAIL,
  payload: email,
});

export const setRegisterPassword = (password) => ({
  type: actionTypes.SETREGISTERPASSWORD,
  payload: password,
});

export const setRegisterFieldsDefault = () => ({
  type: actionTypes.SETREGISTERFIELDSDEFAULT,
  payload: null,
});
