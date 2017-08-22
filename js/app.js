define(["angular"], (angular)=>{
        var app = angular.module('hologram', []);
        app.value("base_api", "http://localhost/hologram/api/public");
        return app;
    }
);