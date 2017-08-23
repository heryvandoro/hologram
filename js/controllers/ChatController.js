define(["app", "socketio", "ChatFactory"], (app)=>{
    return app.controller("ChatController", (ChatFactory, $scope, $rootScope)=>{
        $scope.loadChat = ()=>{
            ChatFactory.getChat($rootScope.target.email, $rootScope.me.email).then((response)=>{
                $scope.chats = response.data;
            })
        }
        $scope.$watch(()=>{ return $rootScope.target; }, 
            () => {
                if($rootScope.target!=null){
                    $scope.loadChat();
                }
        }, true);
    })
})