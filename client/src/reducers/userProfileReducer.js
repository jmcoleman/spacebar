import {
  USER_PROFILE_LOADING,
  GET_USER_PROFILE,
  CLEAR_CURRENT_USER_PROFILE
} from "../actions/types";

const initialState = {
  userprofile: null,
  userprofiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_LOADING:
      console.log("made it to USER_PROFILE_LOADING");
      return {
        ...state,
        loading: true
      };
    case GET_USER_PROFILE:
      console.log("made it to GET_USER_PROFILE");
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_USER_PROFILE:
      console.log("made it to CLEAR_CURRENT_USER_PROFILE");
      return {
        ...state,
        profile: null
      };
    default:
      console.log("Hit the default in userprofileReducer.");
      return state;
  }
}
