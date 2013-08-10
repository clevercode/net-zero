$ ->
  # window - form - button - padding
  height = $(window).height() - $('form').height() - $('.button.login').height() - 90
  $('#messagesDiv').css height: height
