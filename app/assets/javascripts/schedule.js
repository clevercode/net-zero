bookies.controller('scheduleController', ['$scope', 'angularFireCollection', function scheduleController($scope, angularFireCollection){
  var url ='https://anicoll-livechat.firebaseio.com';
  $scope.items = angularFireCollection(url);
  console.log($scope);
}]);
