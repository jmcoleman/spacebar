import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import userprofileReducer from "./userprofileReducer";

export default combineReducers({
  article: articleReducer,
  errors: errorReducer,
  auth: authReducer,
  user: userReducer,
  userprofile: userprofileReducer
});
