import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  article: articleReducer,
  errors: errorReducer,
  auth: authReducer,
  user: userReducer,
  userprofile: userProfileReducer
});
