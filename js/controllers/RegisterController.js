define(["app", "jquery", "UserFactory"], (app)=>{
    return app.controller("RegisterController", function($scope, UserFactory){
        $scope.users = {};

        $scope.register = ()=>{
            var data = {
                user_id : conn.id,
                fullname : $scope.fullname,
                initial : $scope.getInitial($scope.fullname),
                email : $scope.email
            }
            UserFactory.register(data).then((response)=>{
               // console.log(response)
            })
        }
        
        $scope.getInitial = (name)=>{
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