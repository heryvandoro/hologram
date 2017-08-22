define(["app"], (app)=>{
    return app.factory("UserFactory", ($http, base_api)=>{
        var obj = {};
        obj.register = (data)=>{
            return $http({
                url : base_api+"/user",
                method : "POST",
                data : data
            })
        }
        obj.getOnline = ()=>{
            return $http({
                url : base_api+"/user",
                method : "GET",
                params : {
                    online : "true"
                }
            })
        }
        return obj;
    })
})