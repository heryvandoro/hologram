define(["app", "jquery", "UserFactory"], (app)=>{
    return app.controller("UserController", function(UserFactory, $scope, $rootScope){

        $scope.users = [];
        $scope.target = {};

        $scope.loadUsers = ()=>{
            UserFactory.getOnline().then((response)=>{
                angular.forEach(response.data, (x)=>{
                    x.color = $scope.randColor();
                });
                
                $scope.users = response.data;

                var temp = $scope.users.find(x=>{
                    return x.user_id==$rootScope.me.user_id
                });
                if(temp!=null)
                    $scope.users.splice($scope.users.indexOf(temp), 1);
            })
        }

        $scope.$watch(()=>{ return $rootScope.me; }, 
            () => {
                if($rootScope.me!=null){
                    $scope.loadUsers();
                }
        }, true);
        

        $scope.randColor = ()=>{
            var r = Math.floor((Math.random()*255)+1);
            var g = Math.floor((Math.random()*255)+1);
            var b = Math.floor((Math.random()*255)+1);

            return "rgb("+r+","+g+","+b+")";
        }

        app.conn.on("new_user", (data)=>{
            if($rootScope.me!=null){
                $scope.$apply(()=>{
                    $scope.users.push(data);
                })
            }
        })

        app.conn.on("del_user", (data)=>{
            $scope.$apply(()=>{
                var temp = $scope.users.find(x=>{
                    return x.user_id==data
                });
                if(temp!=null)
                    if($rootScope.target.user_id==temp.user_id) {
                        $rootScope.target="";
                        
                    }
                    $scope.users.splice($scope.users.indexOf(temp), 1);
            })
        })

        $scope.openChat = (res)=>{
            $rootScope.target = res.user;
        }

        $(document).on("click", ".user", function(){
            $(".user").removeClass("active");
            $(this).addClass("active");
        })
    })
})