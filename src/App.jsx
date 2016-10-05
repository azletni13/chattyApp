import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [

      ],
    }
    this.setState(this.state)
  }




  InputEnter = (event) => {
    var message = {username: this.state.currentUser.name, content: event.target.value};

    this.ws.send(JSON.stringify(message))

  }

  UserEnter(event){

    let userName = event.target.value;
    this.state.currentUser.name = userName;
    this.setState(this.state);
  }



  handleMessage = (responseFromServer) => {
    var serverMessage = JSON.parse(responseFromServer.data)
    console.log(serverMessage)
    this.state.messages.push(serverMessage)
    this.setState(this.state)
  }


  componentDidMount = () => {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket('ws://localhost:5000/');
    this.ws.onopen = (event) => {
      console.log("connection to server established")
      this.ws = event.target
      this.ws.onmessage = this.handleMessage
    }
  }

  render(){
    return (
      <div className = "wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
        <div>
          <MessageList listOfMessages={this.state.messages}/>
          <ChatBar
            pressInputEnter={this.InputEnter.bind(this)}
            pressUserEnter={this.UserEnter.bind(this)}
          />
        </div>
      </div>
    );
  }
};

export default App;



