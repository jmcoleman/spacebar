import axios from "axios";

import {
  USER_PROFILE_LOADING,
  GET_USER_PROFILE,
  CLEAR_CURRENT_USER_PROFILE,
  GET_ERRORS
} from "./types";

// Get current user profile
export const getCurrentUserProfile = () => dispatch => {
  dispatch(setUserProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_PROFILE,
        payload: {}
      })
    );
};

// Create User Profile
export const createUserProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/home"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update User Profile
// export const updateUserProfile = (profileData, history) => dispatch => {
//   axios
//     .post("/api/profile", profileData)
//     .then(res => history.push("/home"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// User Profile loading
export const setUserProfileLoading = () => {
  return {
    type: USER_PROFILE_LOADING
  };
};

// Clear user profile
export const clearCurrentUserProfile = () => {
  return {
    type: CLEAR_CURRENT_USER_PROFILE
  };
};
