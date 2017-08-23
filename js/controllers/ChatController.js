define(["app", "socketio", "ChatFactory"], (app)=>{
    return app.controller("ChatController", (ChatFactory, $scope, $rootScope)=>{

        $scope.chats = [];

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

        $scope.sendMessages = x=>{
            if(x.which==13 && $scope.messages!=null && $scope.messages!=""){
                ChatFactory.sendChat({
                    sender : $rootScope.me.email,
                    recv : $rootScope.target.email,
                    messages : $scope.messages
                }).then(function(response){
                    if(response.data.errors) console.log(response.data.errors)
                    else{
                        app.conn.emit("messages", {
                            sender : response.data.created.sender,
                            recv : response.data.created.recv,
                            messages : response.data.created.messages,
                            detail : {
                                r_id : $rootScope.target.user_id,
                                s_id : $rootScope.me.user_id
                            }
                        });
                        $scope.messages = "";
                    }
                });
            }
        }

        app.conn.on("messages", data=>{
            $scope.$apply(()=>{
                if($rootScope.target!=null){
                    if($rootScope.me.email==data.recv && $rootScope.target.email==data.sender
                        || $rootScope.target.email==data.recv && $rootScope.me.email==data.sender){
                        $scope.chats.push(data);
                    }
                }
            })
        })

        $scope.noPartner = ()=>{
            if($rootScope.target=="" || $rootScope.target==null)
                return true;
            return false;
        }
    })
})