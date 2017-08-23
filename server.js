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
    socket.on("new_user", (data)=>{
        socket.broadcast.emit('new_user', data);
    })
    socket.on("disconnect", ()=>{
       makeRequest("POST", "/user/makeoffline", {target:socket.id});
       socket.broadcast.emit('del_user', socket.id);
    })
    socket.on("messages", (data)=>{
        io.sockets.connected[data.detail.s_id].emit("messages", data);
        io.sockets.connected[data.detail.r_id].emit("messages", data);
    })
});