import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UsernameForm from "./UsernameForm";
import ChatScreen from "./ChatScreen";
import { addChatUser } from "../../actions/chatappActions";

import axios from "axios";

class ChatApp extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: "",
      currentScreen: "WhatIsYourUsernameScreen"
    };
  }

  onUsernameSubmitted = username => {
    console.log("OnUserNameSubmitted: " + username);

    // this.props.addChatUser(username);

    axios
      .post("/chat/users", username, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.setState({
          currentUsername: username,
          currentScreen: "ChatScreen"
        });

        // dispatch({
        //   type: ADD_CHAT_USER,
        //   payload: res.data
        // });
      })
      .catch(err => {
        console.error("error", err);
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // });
      });

    /////////////////////

    // fetch("/chat/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ username })
    // })
    //   .then(response => {
    //     this.setState({
    //       currentUsername: username,
    //       currentScreen: "ChatScreen"
    //     });
    //   })
    //   .catch(error => console.error("error", error));
  };

  onIsValidChatUser = username => {
    console.log("onIsValidChatUser: " + username);

    this.props.addChatUser(username);

    // fetch("/chat/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ username })
    // })
    //   .then(response => {
    //     this.setState({
    //       currentUsername: username,
    //       currentScreen: "ChatScreen"
    //     });
    //   })
    //   .catch(error => console.error("error", error));
  };

  render() {
    if (this.state.currentScreen === "WhatIsYourUsernameScreen") {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />;
    }
    if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername} />;
    }

    ///////////////////////////////////////////////////////////////////////
    // if isValidChatUser then go to ChatScreen, else prompt for UserName
    ///////////////////////////////////////////////////////////////////////
    // if (this.onIsValidChatUser(this.props.loggedInUser)) {
    //   return <ChatScreen currentUsername={this.props.currentUsername} />
    // } else {
    //   return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    // }
  }
}

ChatApp.propTypes = {
  addChatUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    // loggedInUser: state.loggedInUser,
    errors: state.errors
  };
};

// export default ChatApp;
export default connect(
  mapStateToProps,
  { addChatUser },
  null
)(ChatApp);
