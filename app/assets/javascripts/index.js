NetZero.controller('Index', ['$scope', 'angularFireCollection', function($scope, angularFireCollection){
  $scope.goals = angularFireCollection('https://netzero.firebaseio.com/goals');
  $scope.users = angularFireCollection('https://netzero.firebaseio.com/users');
  console.log('goals:', $scope.goals);
  console.log('users:', $scope.users);

  $scope.userNameFromId = function(id) {
    if (!!$scope.users && $scope.users.length) {
      var user = _.find($scope.users, function(user) { return user.id == id; });
      return user.name;
    } else {
      return id;
    }
  }
  // ticketForm.date.value = Date.create().format('{Mon} {dd}{ord}');
  $scope.saveTicket  = function(ticket) {
    var goalRef = this.goal.$ref;
    goalRef.child('tickets').push({
      amount: ticket.amount,
      date: Date.parse(Date.create(ticket.date)),
      user_id: ticket.user
    });
  };

}]);
