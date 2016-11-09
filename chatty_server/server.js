const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

var colours = ['red', 'green', 'purple', 'blue'];

//function that broadcasts any data to all clients connected to the web socket (wss)
const broadcast = (data) => {
  wss.clients.forEach( client => {
    client.send(JSON.stringify(data));
  })
}

//
wss.on('connection', (ws) => {
  console.log('Client connected');
  //gets the number of users online
  var usersOnline = wss.clients.length;
  //gets a random colour from array of colours
  var rand = colours[Math.floor(Math.random() * colours.length)]

  var usersOnline = {usersOnline: usersOnline}
  var randomColour = {assignColour: rand}


  broadcast(usersOnline)
  ws.send(JSON.stringify(randomColour));
  //receives all messages from connected clients and checks post type
  ws.on('message', (clientMessage) => {
    var incomingMsg = JSON.parse(clientMessage);
    var uniqueID = uuid.v1();

    if (incomingMsg.type === "postMessage"){
      incomingMsg.id = uniqueID;
      incomingMsg.type = "incomingMessage"

      broadcast(incomingMsg);
    }

    if (incomingMsg.type === "postNotification"){
      incomingMsg.id = uniqueID;
      incomingMsg.type = "incomingNotification"

      broadcast(incomingMsg);

    }

  })





  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});