var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = [];

server.listen(5000, function(){
    console.log("Listening on 5000");
});

io.on("connection", (socket)=>{
    socket.on("register", (data)=>{
        
    })
});