import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
  render() {
    return (
      <div id="message-list">
        <div>
          {
            this.props.listOfMessages.map((message) => (
              <Message key={message.id} name={message.username} content={message.content} />
            ))
          }
        </div>

      </div>
    );
  }
};
export default MessageList;