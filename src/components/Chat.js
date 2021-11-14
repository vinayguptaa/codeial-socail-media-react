import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true|false}
      typedMessage: '',
      showChats: false,
    };
    this.socket = io('http://localhost:8000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on('connect', function () {
      console.log('CONNECTION ESTABLISHED');
      socketConnection.emit('join_room', {
        user_email: self.userEmail,
        chatroom: 'codeial',
      });
      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });
    });
    this.socket.on('receive_message', function (data) {
      // add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      console.log('emit send_message');
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  toggleShowChat = () => {
    this.setState({
      showChats: !this.state.showChats,
    });
  };

  render() {
    const { typedMessage, messages, showChats } = this.state;
    console.log('messages', messages);
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/minus-icon-18-256.png"
            alt=""
            height={17}
            onClick={this.toggleShowChat}
          />
        </div>
        {showChats && (
          <div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  className={
                    message.self
                      ? 'chat-bubble self-chat'
                      : 'chat-bubble other-chat'
                  }
                  key={index}
                >
                  {message.content}
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) =>
                  this.setState({ typedMessage: e.target.value })
                }
              />
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
