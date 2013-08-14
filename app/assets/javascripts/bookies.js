var bookies = angular.module('bookies', ['firebase']);
bookies.masterUrl = 'https://anicoll-livechat.firebaseio.com';

bookies.run(['angularFireAuth', function(angularFireAuth){
    angularFireAuth.initialize(bookies.masterUrl,{'name' : 'user', 'path' : '/'});
}]);
