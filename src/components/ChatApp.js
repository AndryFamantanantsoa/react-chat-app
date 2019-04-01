import '../styles/ChatApp.css';
import React from 'react';
import { connect } from 'react-redux';

import Messages from './Messages';
import ChatInput from './ChatInput';

import {
  sendMessageToServer
} from '../socket';

class ChatApp extends React.Component {
  
  sendMessage = (message) => {
    const { dispatch } = this.props;

    dispatch({ type: 'SEND_MESSAGE_SERVER', message:message, name:this.props.username, fromMe: true });
    sendMessageToServer(message, this.props.username, false);
   
  };

  render() {
    return (
      <div className="container">
      
      <h3>Chat</h3>
        
          <Messages messages={this.props.msg} />
          <ChatInput onSend={this.sendMessage} />
      
      </div>
    );
  }

}
ChatApp.defaultProps = {
  names: '',
  username: ''
};
const mapStateToProps = state => ({
  msg: state.messages,
  frMe: state.fromMe
  
});

export default connect(mapStateToProps)(ChatApp);