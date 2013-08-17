NetZero.controller('Index', ['$scope', 'angularFireCollection', function($scope, angularFireCollection){
  var dataRef = new Firebase('https://netzero.firebaseio.com/goals');

  dataRef.on('value', function(snapshot) {
    console.log('dataRef Snapshot.val() : ', snapshot.val());
    $scope.goals = snapshot.val();
    $scope.$apply();
  });



}]);
