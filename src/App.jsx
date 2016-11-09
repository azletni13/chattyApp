import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Online from './Online.jsx';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob", currentColour: "black"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      online: [],
    }
  }

  //sends message to server on Enter
  inputEnter = (event) => {
    var message = {type: "postMessage",
                  username: this.state.currentUser.name,
                  content: event.target.value,
                  colour: this.state.currentUser.currentColour};
    this.ws.send(JSON.stringify(message))

  }

  //sends username change notification to the server on Enter
  userEnter = (event) => {
    let userName = event.target.value;
    var notification = {type: "postNotification",
                        content: `${this.state.currentUser.name} has changed their name to ${userName}.`, colour: "black"}
    this.state.currentUser.name = userName;
    this.setState(this.state);
    this.ws.send(JSON.stringify(notification));

  }

  //handles all messages coming in from the server
  handleMessage = (responseFromServer) => {
    var serverMessage = JSON.parse(responseFromServer.data);
    if(serverMessage.usersOnline){
      this.state.online = serverMessage.usersOnline;
      this.setState(this.state);
    }

    if(serverMessage.assignColour){
      this.state.currentUser.currentColour = serverMessage.assignColour;
      this.setState(this.state);
    }
    if(serverMessage.type === "incomingMessage" || serverMessage.type === "incomingNotification" ){
      this.state.messages.push(serverMessage)
      this.setState(this.state);
      console.log(this.state.messages);
    }
  }

  //establishes websocket connection when component mounts
  componentDidMount = () => {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket('ws://localhost:5000/');
    this.ws.onopen = (event) => {
      console.log("connection to server established");
      //??? FIND OUT FROM MENTOR
      this.ws = event.target;
      //re-routing the onmessage event to be handled by the handleMessage function
      this.ws.onmessage = this.handleMessage;
    }
  }

  render(){
    return (
      <div className = "wrapper">

        <Online currentOnline={this.state.online} />
        <div>
          <MessageList

            listOfMessages={this.state.messages}
          />
          <ChatBar
            initialName={this.state.currentUser.name}
            pressInputEnter={this.inputEnter.bind(this)}
            pressUserEnter={this.userEnter.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;



