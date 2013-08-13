bookies.controller('chatController', ['$scope', 'angularFireCollection', function chatController($scope, angularFireCollection){

  var url ='https//fullsail.firebaseio.com/chat';
  $scope.messages = angularFireCollection(url, $scope, 'msgs', []);
  $scope.addMsg = function(){
    $scope.messages.add({name:"Force", text: $scope.MsgInput});
  };

  var userName = "";
  var myDataRef = new Firebase('https://harbuckle.firebaseio.com/chat');


  $scope.addMsg = function(){
    $scope.messages.add({name : user.displayName , text: $scope.MsgInput});
  };
}]);
