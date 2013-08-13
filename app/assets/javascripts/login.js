bookies.controller('loginController', ['$scope', 'angularFireCollection', function loginController($scope, angularFireCollection){

  var currentUser = false;
  console.log($scope + 'anything');

  $scope.fbLogin = function(){
    if(currentUser == false){
      auth.login('facebook', {scope:'email, user_birthday'});
      console.log('log in');
    }else{  
      auth.logout();
      console.log('log out');
    }
  };

  var myDataRef = new Firebase('https://anicoll-livechat.firebaseio.com');
  $scope.items = angularFireCollection(myDataRef);

  var auth = new FirebaseSimpleLogin(myDataRef, function(error, user) {
    if (error) {
      console.log(error);
    } else if (user) {
      currentUser = true;
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      console.log('name : ' + user.displayName);
      userName = user.displayName;
      $scope.LoginStatus = "Log Out";
    } else {
      // user is logged out
      currentUser = false;
      console.log('else is firing');
      $scope.LoginStatus = "Log In";
    }
  });
}]);
