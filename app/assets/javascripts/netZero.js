var NetZero = angular.module('NetZero', ['firebase']);
NetZero.masterUrl = 'https://NetZero.firebaseio.com/';

NetZero.run(['angularFireAuth', function(angularFireAuth){
    angularFireAuth.initialize(NetZero.masterUrl,{'name' : 'user', 'path' : '/'});
}]);
