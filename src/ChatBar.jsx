import React, {Component} from 'react';

class ChatBar extends Component {


  onInputEnter = (event) => {
    if(event.key === 'Enter'){
      this.props.pressInputEnter(event)
      this.refs.chatbar.value = ""
    }
  }

  onUserEnter = (event) => {
      this.props.pressUserEnter(event)
  }


  render() {
    return (
      <footer>
        <input id="username"
              type="text"
              onKeyPress={this.onUserEnter}
        />
        <input id="new-message"
              ref="chatbar"
              type="text"
              onKeyPress={this.onInputEnter}
        />
      </footer>

    );
  }
};
export default ChatBar;