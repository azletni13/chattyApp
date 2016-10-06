import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Online from './Online.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      usersOnline: []

    }
  }

  inputEnter = (event) => {
    var message = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value};

    this.ws.send(JSON.stringify(message))

  }

  userEnter = (event) => {

    let userName = event.target.value;
    var notification = {type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${userName}.`}
    this.state.currentUser.name = userName;
    this.setState(this.state);
    this.ws.send(JSON.stringify(notification));

  }

  handleMessage = (responseFromServer) => {
    var serverMessage = JSON.parse(responseFromServer.data);

    if(typeof serverMessage == "number"){
      console.log(serverMessage)
      this.state.usersOnline[0] = serverMessage;
      this.setState(this.state);
    }else{
    this.state.messages.push(serverMessage);
    this.setState(this.state);
    }
  }


  componentDidMount = () => {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket('ws://localhost:5000/');
    this.ws.onopen = (event) => {
      console.log("connection to server established");
      this.ws = event.target;
      this.ws.onmessage = this.handleMessage;
    }
  }

  render(){
    return (
      <div className = "wrapper">

        <Online currentOnline={this.state.usersOnline} />
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



