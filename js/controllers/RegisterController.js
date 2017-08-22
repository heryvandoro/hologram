define(["app", "jquery", "UserFactory"], (app)=>{
    return app.controller("RegisterController", function($scope, $rootScope,  UserFactory){
        //$scope.me = {};
        
        $scope.register = ()=>{
            var data = {
                user_id : app.conn.id,
                fullname : $scope.fullname,
                initial : $scope.getInitial($scope.fullname),
                email : $scope.email
            }
            UserFactory.register(data).then((response)=>{
               if(response.data.errors) {
                    $scope.errors = response.data.errors;
               }else{
                    localStorage.setItem("user", response.data);
                    $rootScope.me = response.data;
                    app.conn.emit("new_user", response.data);
                    $("#register").hide();
                    $(".modal-bg").hide();
               }
            })
        }
        
        $scope.getInitial = (name)=>{
            if(name==null || name=="") return "XX";
            
            var initial;
            name = name.trim();
            if(name.indexOf(" ")!=-1)
                initial = name.charAt(0)+name.charAt(name.indexOf(" ")+1);
            else
                initial = name.substr(0,2);
            return initial.toUpperCase();
        }
    })
})