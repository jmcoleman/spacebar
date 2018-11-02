import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from "../actions/types";

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  console.log("action type is:  " + action.type);
  switch (action.type) {
    case GET_USERS:
      console.log("made it to GET_USERS");
      return {
        ...state,
        users: action.payload
      };
    case GET_USER:
      console.log("made it to GET_USER");
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER:
      console.log("made it to DELETE_USER");
      console.log(state);
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case ADD_USER:
      console.log("made it to ADD_USER");
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case UPDATE_USER:
      console.log("made it to UPDATE_USER");
      console.log(action.payload);
      return {
        ...state,
        users: state.users.map(
          user =>
            user._id === action.payload._id ? (user = action.payload) : user
        )
      };
    default:
      console.log("Hit the default in userReducer.");
      return state;
  }
}
