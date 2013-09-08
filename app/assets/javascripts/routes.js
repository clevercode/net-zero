NetZero.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/", {
     templateUrl: '/index.html'
    })
    .when("/velocity", {
      templateUrl: '/velocity.html',
      controller: "velocityController"
    })
}]);
