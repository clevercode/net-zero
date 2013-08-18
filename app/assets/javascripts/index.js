NetZero.controller('Index', ['$scope', 'angularFireCollection', function($scope, angularFireCollection){
  var dataRef = new Firebase('https://netzero.firebaseio.com/goals');

  dataRef.on('value', function(snapshot) {
    console.log('dataRef Snapshot.val() : ', snapshot.val());
    $scope.goals = _.map(snapshot.val(), function(goal) {
      goal.tickets = _.sortBy(goal.tickets, 'date').reverse();
      goal.tickets = _.map(goal.tickets, function(ticket) {
        ticket.date = Date.create(ticket.date).format('{Mon} {dd}');
        return ticket;
      });

      return goal;
    });

    $scope.$apply();

    window.goals.initialize()
  });

}]);
