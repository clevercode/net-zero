//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require turbolinks
//= require_tree .

$(function(){
  var loginButton =  $('.button.login');
  var currentUser = false;
  var userName = "";
  var myDataRef = new Firebase('https://harbuckle.firebaseio.com/chat');

  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      if(currentUser){
        name = userName
      }else{
        name = $('#nameInput').val();
      };
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });

  var auth = new FirebaseSimpleLogin(myDataRef, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      currentUser = true;
      // user authenticated with Firebase
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      console.log('name : ' + user.displayName);
      userName = user.displayName;
      loginButton.text("Log Out");
      $('input#nameInput').replaceWith($('<div class="userNameDisplay">').text(user.displayName));
    } else {
      // user is logged out
      console.log('else is firing');
    }
  });





  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
  function displayChatMessage(name, text) {
    // console.log(name, text);
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };

  loginButton.on('click', function(){
    console.log(currentUser);
    if(currentUser == false){
      auth.login('facebook');
      currentUser = true;
      console.log('log in');
    }else{  
      auth.logout();
      loginButton.text("Login");
      currentUser = false;
      console.log('log out');
      $('.userNameDisplay').replaceWith($('<input id="nameInput" placeholder="Name">'))
    }
  });


});
