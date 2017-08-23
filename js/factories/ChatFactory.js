define(["app"], (app)=>{
    return app.factory("ChatFactory", ($http, base_api)=>{
        var obj = {};
        obj.getChat = (em1, em2)=>{
            return $http({
                method : "GET",
                url : base_api+"/chat",
                params : {
                    em1 : em1,
                    em2 : em2
                }
            })
        }
        obj.sendChat = (data)=>{
            return $http({
                method : "POST",
                url : base_api+"/chat",
                data : data
            })
        }
        return obj;
    })
})