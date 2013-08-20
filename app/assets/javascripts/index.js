NetZero.controller('Index', ['$scope', 'angularFireCollection', function($scope, angularFireCollection){
  $scope.goals = angularFireCollection('https://netzero.firebaseio.com/goals');
  $scope.users = angularFireCollection('https://netzero.firebaseio.com/users');
  $scope.ticket = { date: Date.create().format('{Mon} {ord}') };

  $scope.remainingBudget = function(budget, tickets) {
    if (!!budget && !!tickets) {
      budget = parseFloat(budget);
      for (var id in tickets) {
        budget -= parseFloat(tickets[id].amount);
      }
    }

    return budget;
  }

  // Returns a user's name if we can find them, otherwise return the id.
  $scope.userNameFromId = function(id) {
    if (!!$scope.users && $scope.users.length) {
      var user = _.find($scope.users, function(user) { return user.$id == id; });
      return !!user ? user.name : id;
    } else {
      return id;
    }
  }

  // Runs everytime the $scope.goals variable is updated.
  // Sets a timeout before initializing the goals,
  // in an attempt to only run it when they all exist.
  var timeout;
  $scope.$watch('goals.length', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      window.goals.initialize();
    }, 100);
  });

  // Runs everytime the $scope.users variable is updated.
  // Sets the user property of the ticket to the first user.
  $scope.$watch('users.length', function() {
    if ($scope.users.length) {
      $scope.ticket.user = $scope.users[0];
    }
  });

  // Saves the form data for the new ticket to the server.
  $scope.saveTicket  = function(ticket) {
    var goalRef = this.goal.$ref;
    goalRef.child('tickets').push({
      amount: parseFloat(ticket.amount),
      date: Date.parse(Date.create(ticket.date)),
      user_id: ticket.user.$id
    });
  };

}]);
