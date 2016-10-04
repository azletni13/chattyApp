import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
        id: 1,
        username: "Bob",
        content: "Has anyone seen my marbles?",
        },
        {
        id: 2,
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }


  handleEnter(){
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }




  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(function() {
    console.log("Simulating incoming message");
    // Clone data object and adds a new message to the list of messages in the data store
     var messages = [...this.state.messages, {id: 3, username: "Michelle", content: "Hello there!"}]
    // Update the state of the app component. This will call render()
    this.setState({messages})
  }.bind(this), 3000);
  }

  render(){
    return (
      <div className = "wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
        <div>
          <MessageList listOfMessages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser.name} onEnter={handleEnter()}/>
        </div>
      </div>
    );
  }
};

export default App;



