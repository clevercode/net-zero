window.weeks = {
  initialize: function() {
    this.all = [];
    this.url = 'https://netzero.firebaseio.com/weeks/';
  },

  // @param [Date] A string, int, or date object capable of being parsed.
  // Returns a timestamp represnting the beginning of the week.
  getBeginningOfWeek: function(date) {
    var beginning = Date.create(date).beginningOfWeek();
    return Date.parse(beginning);
  },

  // @param [Timestamp] The timestamp representing the desired week.
  // Returns a jQuery promise.
  // Checks to see if we already have the week store locally.
  // If not, make a new ref and store it for next time.
  // Resolves the promise, sending the week information.
  getWeekRef: function(timestamp) {
    timestamp   = this.getBeginningOfWeek(timestamp);
    var promise = $.Deferred();
    var week    = _.find(this.all, function(week) {
      return week.timestamp === timestamp;
    });

    if (week === undefined) week = this._addNewWeek(timestamp);
    this._resolvePromise(promise, week);
    return promise;
  },

  // private
  // 

  // @param [Timestamp] The timestamp representing the desired week.
  // Gets a new Firebase ref and stores it locally.
  // Returns the newly created week object.
  _addNewWeek: function(timestamp) {
    ref  = new Firebase(this.url + timestamp);
    week = { timestamp: timestamp, ref: ref }
    this.all.push(week);
    return week;
  },

  // @param [$.Deferred] The promise to resolve when the time comes.
  // @param [Object] The object containing our week's information.
  // Resolves the given promise, sending the week's timestamp, ref, and whether
  //  or not it exists in our DB yet.
  _resolvePromise: function(promise, week) {
    if (week.data !== undefined) {
      promise.resolve(week.timestamp, week.ref, week.data);
    } else {
      week.ref.once('value', function(snapshot) {
        week.data = snapshot.val();
        promise.resolve(week.timestamp, week.ref, week.data);
      });
    }
  }
}
