(()=>{
  var paths = {
    "angular" : "angular.min",
    "jquery" : "jquery-3.2.1.min",
    "socketio" : 'socket.io',
    
    "UserController" : "controllers/UserController",
    "RegisterController" : "controllers/RegisterController",

    "UserFactory" : "factories/UserFactory",
  };

  require.config({
    baseUrl : "js",
    paths : paths,
    shim: {
        angular: {
            exports: 'angular'
        },
    },
  });
    
  var req = ["app", "socketio", "RegisterController", "UserController"];
  require(req, (app, socketio) => { 
    angular.bootstrap(document, ['hologram']); 
    window.io = socketio;
    window.conn = io.connect("http://localhost:5000");
  });
})();