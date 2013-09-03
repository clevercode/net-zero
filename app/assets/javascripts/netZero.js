// Namespace to attach objects to.
window.NZ = {};

// Angular business.
var NetZero = angular.module('NetZero', ['firebase']);
NetZero.masterUrl = 'https://netzero.firebaseio.com/';

NetZero.run(['angularFireAuth', function(angularFireAuth){
    angularFireAuth.initialize(NetZero.masterUrl,{'name' : 'user', 'path' : '/'});
}]);
