var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var request = require('request');

var users = [];

function makeRequest(method, path, data=null){
    request({
        method : method,
        url : "http://localhost:8000"+path,
        json : data,
    })
}

server.listen(5000, function(){
    console.log("Listening on 5000");
});

io.on("connection", (socket)=>{
    socket.on("register", (data)=>{
        
    })
    socket.on("disconnect", ()=>{
       makeRequest("POST", "/user/makeoffline", {target:socket.id});
    })
});
