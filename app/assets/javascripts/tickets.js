window.tickets = {
  initialize: function() {
    this.view = $('.tickets-container');
    this.overlay = $('#overlay');
    this.attachEventListeners();
  },

  attachEventListeners: function() {
    this.view.on('click', '.new-ticket', $.proxy(this, '_onNewTicketClick'));
    this.view.on('click', '.close-form', $.proxy(this, '_onCloseFormClick'));
    this.view.on('submit', 'form', $.proxy(this, '_onNewTicketSubmit'));
  },

  // event handlers
  // 

  _onNewTicketClick: function(event) {
    var $form = $(event.currentTarget).next('form');
    this._openForm($form);
    return false;
  },

  _onCloseFormClick: function(event) {
    var $form = $(event.currentTarget).parents('form');
    this._closeForm($form);
    return false;
  },

  _onNewTicketSubmit: function(event) {
    this._closeForm($(event.currentTarget));
    return true;
  },

  // private
  // 

  _openForm: function($form) {
    $('body').scrollTop(0);
    $form.show().addClass('visible');
    this.overlay.show().css({ opacity: 1 });
  },

  _closeForm: function($form) {
    $form.removeClass('visible');
    this.overlay.css({ opacity: 0 });
    setTimeout(function() {
      $form.hide()
      window.tickets.overlay.hide();
    }, 300);
  }
}
