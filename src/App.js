import './styles/App.css';
import './styles/Login.css';
import { connect } from 'react-redux';
import React from 'react';
import ChatApp from './components/ChatApp';

import {
  sendNameToServer
} from './socket';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Bind 'this' to event handlers. React ES6 does not do this by default
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  setUser = (event) => {
    const { dispatch} = this.props;
    dispatch({ type: 'SET_USER', username:  event.target.value, submitted: false });
  };

  usernameSubmitHandler(event) {
    event.preventDefault();
    const { dispatch, username } = this.props;
    dispatch({ type: 'SET_USER', username: username, submitted: true });
    sendNameToServer(username);
    
  }

  render() {
    const {
      username,
      submitted,
      names
    } = this.props;
    if (submitted) {
      // Form was submitted, now show the main App
      return (
        <ChatApp username={username} names={names} />
      );
    }

    // Initial page load, show a simple login form
    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <h1>Create user.</h1>
        <div>
          <input
            type="text"
            onChange={this.setUser}
            placeholder="Enter a username..."
            required />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}
const mapStateToProps = state => ({
  username: state.name,
  submitted: state.submitted,
  names: state.names
});

export default connect(mapStateToProps)(App);
