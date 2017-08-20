define(["angular"], (angular)=>{
        var app = angular.module('hologram', []);
        app.value("base_api", "http://localhost:8200");
        return app;
    }
);