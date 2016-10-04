import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value})
    console.log(event.target.value)

  }



  render() {
    return (
      <footer>
        <input id="username" type="text" value={this.props.currentUser}/>
        <input id="new-message" type="text" onChange={this.handleChange}/>
      </footer>




    );
  }
};
export default ChatBar;