import React, {Component} from 'react';


class Message extends Component{

  render() {
    if(this.props.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
           <span style={{color: this.props.msg}} className="username">{this.props.name}</span>
            <span className="content">{this.props.content}</span>
          </div>
        </div>


      );
    }
    if(this.props.type === "incomingNotification"){
      return (
          <div className="message system">
            {this.props.content}
          </div>
      );
    }
  }
}
export default Message;