import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import TypingIndicator from "./TypingIndicator";
import WhosOnlineList from "./WhosOnlineList";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
    };
    // this.sendMessage = this.sendMessage.bind(this)
    // this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  };

  sendMessage = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  };

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:bf8def9e-a084-4d5d-b55c-018e22b58449",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: "/chat/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 17843815,
          messageLimit: 10,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            UserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            UserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })

      .catch(error => console.error("error", error));
  }

  render() {
    const styles = {
      container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      chatContainer: {
        display: "flex",
        flex: 1
      },
      whosOnlineListContainer: {
        width: "200px",
        flex: "none",
        padding: 20,
        backgroundColor: "#2c303b",
        color: "white"
      },
      chatListContainer: {
        padding: 20,
        width: "85%",
        display: "flex",
        flexDirection: "column"
      },
      typingIndicatorContainer: {
        padding: 20,
        width: "85%",
        display: "flex",
        flexDirection: "column",
        color: "red"
      }
    };

    return (
      <div style={styles.container}>
        <header style={styles.header}>{/* <h2>Presence</h2> */}</header>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />

            <section style={styles.TypingIndicatorContainer}>
              <TypingIndicator
                usersWhoAreTyping={this.state.usersWhoAreTyping}
              />
              <SendMessageForm
                onSubmit={this.sendMessage}
                onChange={this.sendTypingEvent}
              />
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
