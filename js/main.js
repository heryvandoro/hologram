(()=>{
  var paths = {
    "angular" : "angular.min",
    "jquery" : "jquery-3.2.1.min",
    "socketio" : 'socket.io',
    
    "UserController" : "controllers/UserController",
    "RegisterController" : "controllers/RegisterController",
    "ChatController" : "controllers/ChatController",

    "UserFactory" : "factories/UserFactory",
  };

  require.config({
    baseUrl : "js",
    paths : paths,
    shim: {
        angular: {
            exports: 'angular'
        },
        socketio: {
            exports: 'socketio'
        },
    },
  });
    
  var req = ["app", "socketio", "RegisterController", 
            "UserController", "ChatController"];
  require(req, (app, socketio) => { 
    angular.bootstrap(document, ['hologram']); 
    window.io = socketio;
  });
})();