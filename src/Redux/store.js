import {
  recipesReducer,
  popupsReducer,
  flagsReducer,
  loginReducer,
  registerReducer,
} from "./reducer";
import { combineReducers, createStore } from "redux";

export const store = createStore(
  combineReducers({
    recipesReducer,
    popupsReducer,
    flagsReducer,
    loginReducer,
    registerReducer,
  })
);
