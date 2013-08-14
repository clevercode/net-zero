bookies.config(function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
    .when("",{
     templateUrl: '/dayView.html',
    })
    .when("/chat",{
      templateUrl: '/chat.html',
      controller: "chatController"
    })
    .when("/schedule",{
      templateUrl: '#',
      controller: "scheduleController"
    });

});
