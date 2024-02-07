const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const appServer = express()
const path = require("path");

const server = http.createServer(appServer)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})



const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");

appServer.use(express.static(buildPath));

appServer.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});










//when front-end is connected this console will be printed
io.on("connection" , (socket) => {
    console.log('we are connected');

    //using this the chat message can send to all clients,including the sender
    socket.on("chat" , chat => {
        io.emit('chat', chat)
    })

    //if it is diconnected this console will be printed
    socket.on('disconnected' , ()=> {
        console.log('disconnected');
    })
})



server.listen(5001 , ()=> console.log("Listening to port 5001"))