import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/MessageList.css';

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }
  render() {
    return (
      <div className="conversation-list">
      <Row>
        <Col sm={4}><h3>list contacts</h3></Col>
        <Col sm={8}>
        <ul>
            {this.props.names.length <= 1 ? (
                <li style={{ color: 'red' }}>No other members yet</li>
            ) : (
            this.props.names.map(member => (
                <li
                key={member}
                >
                {member}
                </li>
            ))
            )}
        </ul>
        </Col>
      </Row>
        
      </div>
    );
  }

}
MessagesList.defaultProps = {
    names: ''
  };