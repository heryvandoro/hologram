define(["app", "jquery", "UserFactory"], (app)=>{
    return app.controller("UserController", function(UserFactory, $scope, $rootScope){

        $scope.users = [];

        $scope.loadUsers = function(){
            UserFactory.getOnline().then(function(response){
                angular.forEach(response.data, (x)=>{
                    x.color = $scope.randColor();
                });
                
                $scope.users = response.data;
            })
        }

        $scope.$watch(function() {
            return $rootScope.me;
        }, function() {
            if($rootScope.me!=null){
                $scope.loadUsers();
            }
        }, true);
        

        $scope.randColor = function(){
            var r = Math.floor((Math.random()*255)+1);
            var g = Math.floor((Math.random()*255)+1);
            var b = Math.floor((Math.random()*255)+1);

            return "rgb("+r+","+g+","+b+")";
        }

        app.conn.on("new_user", (data)=>{
            $scope.$apply(function(){
                $scope.users.push(data);
            })
        })
    })
})