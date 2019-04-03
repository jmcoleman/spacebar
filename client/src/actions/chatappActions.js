import { ADD_CHAT_USER, GET_ERRORS } from "./types";
import axios from "axios";

export const addChatUser = userName => async dispatch => {
  axios
    .post("/chat/users", userName, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({
        currentUsername: userName,
        currentScreen: "ChatScreen"
      });

      dispatch({
        type: ADD_CHAT_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
