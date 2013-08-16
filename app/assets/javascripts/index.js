NetZero.controller('Index', ['$scope', 'angularFireCollection', function($scope, angularFireCollection){
  // var dataRef = new Firebase('https://netzero.firebaseio.com/goals/0');

  var goals =   {"goals" : [{
                      "weekend" : {
                        "budget"   : 75,
                        "tickets"          : "100:[{08162013, 0}]"
                      },
                      "groceries" : {
                        "budget"   : 150,
                        "tickets"          : "100:[{08162013, 0}]"
                      },
                      "gas" : {
                        "budget"   : 100,
                        "tickets"          : "100:[{08162013, 0}]"
                      },
                      "sbux" : {
                        "budget"   : 40,
                        "tickets"          : "100:[{08162013, 0}]"
                      }
                    }
                  ]};

    console.log(goals.weekend);

  // dataRef.on('value', function(snapshot) {
  //   console.log(snapshot.val());
  //   var goals = snapshot.val();
  // });



}]);
