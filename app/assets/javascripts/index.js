NetZero.controller('Index', ['$scope', '$swipe', 'angularFireCollection', function($scope, $swipe, angularFireCollection) {
  var timestamp = window.weeks.getBeginningOfWeek('today');
  $scope.goals  = angularFireCollection('https://netzero.firebaseio.com/goals');
  $scope.users  = angularFireCollection('https://netzero.firebaseio.com/users');
  $scope.week   = angularFireCollection('https://netzero.firebaseio.com/weeks/' + timestamp);
  $scope.ticket = { date: Date.create().format('{Mon} {ord}') };

  window.weeks.initialize();
  window.goals.initialize();

  window.tickets.initialize();
  window.tickets.promise.progress(function(info) {
    var tickets = $scope.week
      , ticket  = undefined;

    for (var i = 0; i < tickets.length; i++) {
      if (tickets[i].$id === info.ticket) ticket = tickets[i];
    }

    if (info.remove === true) {
      ticket.$ref.remove();
      window.goals.update(true);
    } else {
      ticket.$ref.update({paid: info.paid});
    }
  });

  $scope.remainingBudget = function(goal, tickets, percentage) {
    var budget = goal.budget;
    var originalBudget = budget;
    if (!!goal && !!tickets) {
      budget = parseFloat(budget);
      for (var i = 0; i < tickets.length; i++) {
        if (tickets[i].goal_id === goal.$id) {
          budget -= parseFloat(tickets[i].amount);
        }
      }
    }

    if (!!percentage) budget = (budget / originalBudget) * 100;
    return Math.floor(budget);
  }

  $scope.completedClass = function(ticket) {
    return ticket.paid === true ? 'completed' : '';
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
  // BAD hardcoded timeout. Will fix later.
  $scope.$watch('goals.length', function() {
    setTimeout(function(){
      window.goals.update();
    }, 750);
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
      paid:    false,
      date:    Date.parse(Date.create(ticket.date)),
      note:    ticket.note || '',
      goal_id: this.goal.$id,
      user_id: ticket.user.$id
    };

    addTicketToWeek(newTicket);

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

  var addTicketToWeek = function(ticket) {
    var promise = window.weeks.getWeekRef(ticket.date)
    promise.done(function(timestamp, weekRef, data) {
      weekRef.push(ticket);
    });
  }
}]);
