window.tickets = {
  initialize: function() {
    this.view = $('.tickets-container');
    this.overlay = $('#overlay');
    this.attachEventListeners();
    this.promise = $.Deferred();
  },

  attachEventListeners: function() {
    this.view.on('click', '.new-ticket', $.proxy(this, '_onNewTicketClick'));
    this.view.on('click', '.close-form', $.proxy(this, '_onCloseFormClick'));
    this.view.on('submit', 'form', $.proxy(this, '_onNewTicketSubmit'));
    this.view.on('touchstart mousedown', 'li.ticket', $.proxy(this, '_onTouchStart'));
    this.view.on('touchmove', 'li.ticket', $.proxy(this, '_onTouchMove'));
    this.view.on('touchend mouseup', 'li.ticket', $.proxy(this, '_onTouchEnd'));
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

  _onTouchStart: function(event) {
    var $ticket  = $(event.currentTarget)
      , coords   = tickets._getCoordinates(event)
      , moveLeft = coords.x / $ticket.width() > .5;

    this._totalX    = 0;
    this._totalY    = 0;
    this._lastPos   = coords;
    this._direction = moveLeft ? 'right' : 'left';
  },

  _onTouchMove: function(event) {
    var $ticket = $(event.currentTarget)
      , coords  = this._getCoordinates(event);

    this._totalX += Math.abs(coords.x - this._lastPos.x);
    this._totalY += Math.abs(coords.y - this._lastPos.y);
    this._lastPos = coords;

    if (this._totalX < 10 && this._totalY < 10) return;
    if (this._totalY < this._totalX) {
      var xPos  = this._lastPos.x
        , width = $ticket.width();

      if (this._direction === 'left') {
        if (xPos / width > .5) {
          $ticket.addClass('completing');
        } else {
          $ticket.removeClass('completing');
        }
      } else {
        xPos = width - xPos;
        if (xPos / width > .5) {
          $ticket.addClass('deleting');
        } else {
          $ticket.removeClass('deleting');
        }
      }

      $ticket.css(this._direction, xPos + 'px');
      event.preventDefault();
    }
  },

  _onTouchEnd: function(event) {
    var $ticket = $(event.currentTarget);

    // Mark ticket as unpaid
    if ($ticket.hasClass('completed') && $ticket.hasClass('completing')) {
      $ticket.removeClass('completing completed');
      var info = {
        ticket: $ticket.prop('id'),
        paid  : false,
        remove: false
      };
      this.promise.notify(info);

    // Mark ticket as paid
    } else if ($ticket.hasClass('completing')) {
      $ticket.removeClass('completing').addClass('completed');
      var info = {
        ticket: $ticket.prop('id'),
        paid  : true,
        remove: false
      };
      this.promise.notify(info);

    // Remove the ticket from existance!
    } else if ($ticket.hasClass('deleting')) {
      $ticket.removeClass('deleting');
      if (confirm('Are you sure?')) {
        $ticket.hide('fast');
        var info = {
          ticket: $ticket.prop('id'),
          paid  : false,
          remove: true
        };
        this.promise.notify(info);
      }
    }

    $ticket.css(this._direction, 0);
  },

  // private
  // 

  _openForm: function($form) {
    $('body').scrollTop(0);
    $form.show();
    setTimeout(function() {
      $form.addClass('visible');
    }, 0);

    this.overlay.show().css({ opacity: 1 });
  },

  _closeForm: function($form) {
    $form.removeClass('visible');
    this.overlay.css({ opacity: 0 });
    setTimeout(function() {
      $form.hide()
      window.tickets.overlay.hide();
    }, 300);
  },

  _getCoordinates: function(event) {
    var touches = event.touches && event.touches.length ? event.touches : [event];
    var e = (event.changedTouches && event.changedTouches[0]) ||
        (event.originalEvent && event.originalEvent.changedTouches &&
            event.originalEvent.changedTouches[0]) ||
        touches[0].originalEvent || touches[0];

    return {
      x: e.clientX,
      y: e.clientY
    };
  }
}
