import { combineReducers } from "redux";

import AccountReducer from "./../Reducers/AccountReducer";
import TimeReducer from "./../Reducers/TimeReducer";
import PostReducer from "./PostReducer";
import PagingReducer from "./PagingReducer";
const myReducer = combineReducers({
  AccountReducer,
  TimeReducer,
  PostReducer,
  PagingReducer,
});
export default myReducer;
