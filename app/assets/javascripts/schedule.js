bookies.controller('scheduleController', ['$scope', 'angularFireCollection', function ($scope, angularFireCollection){
  $scope.items = angularFireCollection(bookies.masterUrl);
  $scope.id = '9';
  console.log($scope);''

  $scope.shiftStuffing = function(data, selectedUser){
    if (data){
      $scope.selectedUser = $scope.user;

      selectedUser.enabled ; 
    }
    console.log('shiftStuffing is occuring : ' ,  data);
  };
}]);
