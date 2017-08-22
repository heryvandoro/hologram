define(["angular", "socketio"], (angular, io)=>{
        var app = angular.module('hologram', []);
        app.value("base_api", "http://localhost/hologram/api/public");
        app.conn = io.connect("http://localhost:5000");
        return app;
    }
);