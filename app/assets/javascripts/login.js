bookies.controller('loginController', ['$scope', 'angularFireCollection', 'angularFireAuth', function ($scope, angularFireCollection,angularFireAuth){
$scope.loginButtonDisplay = "Log In";
  $scope.log_user = function(){
    angularFireAuth.login('facebook');
    loginButtonDisplay = "Log Out";
  };
  $scope.logout = function(){};

}]);
