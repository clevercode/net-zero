NetZero.controller('Index', ['$scope', 'angularFireCollection', function($scope, angularFireCollection) {
  var timestamp = Date.parse(Date.create('beginning of week'));
  $scope.goals  = angularFireCollection('https://netzero.firebaseio.com/goals');
  $scope.users  = angularFireCollection('https://netzero.firebaseio.com/users');
  $scope.week   = new Firebase('https://netzero.firebaseio.com/weeks/' + timestamp);

  $scope.ticket = { date: Date.create().format('{Mon} {ord}') };
  window.goals.initialize();
  window.tickets.initialize();

  $scope.remainingBudget = function(budget, tickets, percentage) {
    var originalBudget = budget;
    if (!!budget && !!tickets) {
      budget = parseFloat(budget);
      for (var id in tickets) {
        budget -= parseFloat(tickets[id].amount);
      }
    }

    if (!!percentage) { budget = (budget / originalBudget) * 100 }
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
  $scope.$watch('goals.length', function() {
    window.goals.update();
  });

  // Runs on initial data load, and value change.
  var noWeekExists = false;
  $scope.week.on('value', function(snapshot) {
    noWeekExists = snapshot.val() === null;
  });

  // Runs everytime the $scope.users variable is updated.
  // Sets the user property of the ticket to the first user.
  var gotUser = false;
  $scope.$watch('users.length', function() {
    if (gotUser != true && $scope.users.length) {
      gotUser = true;
      $scope.ticket.user = $scope.users[0];
    }
  });

  // Saves the form data for the new ticket to the server.
  $scope.saveTicket = function(ticket) {
    var newTicket = {
      amount:  parseFloat(ticket.amount),
      date:    Date.parse(Date.create(ticket.date)),
      note:    ticket.note,
      goal_id: this.goal.$id,
      user_id: ticket.user.$id
    };

    addticketToWeek(newTicket);

    // Clears the form data.
    $scope.ticket = {
      amount: '',
      date:   Date.create().format('{Mon} {ord}'),
      note:   '',
      user:   $scope.users[0]
    };

    // Updates our goals on screen.
    window.goals.update(true);
  };

  var addticketToWeek = function(ticket) {
    if (noWeekExists) {
      var week = {};
      week[timestamp] = { 0: ticket };
      $scope.week.parent().set(week);
    } else {
      $scope.week.push(ticket);
    }
  }

}]);
