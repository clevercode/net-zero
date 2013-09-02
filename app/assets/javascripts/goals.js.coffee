window.goals = 

  # Stores a reference to our goals container.
  # Disables selection of text on our goals.
  # Attaches all of our event listeners.
  initialize: ->
    @view = $ '.goals-container'
    @view.disableSelection()
    @attachEventListeners()

  # @param [string] The event you want to listen for.
  # @param [string] The element you want to listen for the event on.
  # @param [function] The funtion you want to call when the event is fired.
  # Attaches an event listener to the view.
  on: (event, selector, handler) ->
    @view.on event, selector, $.proxy this, handler

  # Attaches events listeners to the view and window.
  attachEventListeners: ->
    @view.off '*'
    @on 'scroll', '', '_onScroll'
    @on 'click', '.goal', '_onGoalClick'
    $(window).off('*').on 'orientationchange', $.proxy this, '_onOrientationChange'

  # @param [boolean] If set to true, go ahead and set the progress for each goal
  #   again, instead of only the new goals.
  # Sets a timeout in order to force this method run on the event cycle, after
  #   Angular has finished rendering thins.
  update: (reset = no) ->
    setTimeout =>
      @view.find('.goal:eq(0)').click() unless reset
      @view.find('.goal').removeClass 'progressified' if reset
      @_setGoalProgress()
    , 0

  # event handlers
  # 

  # When we scroll left or right, center the goal we're closest to.
  # Stops any other goals that planned on centering themselves from doing so.
  # Sets a timeout so that if someone scrolls again quickly after stopping, we
  #   don't center a goal they didn't want to get to.
  _onScroll: (event) ->
    clearTimeout @_centerTimeout
    clearTimeout @_scrollTimeout
    @_scrollTimeout = setTimeout =>
      @_centerGoal()
    , 50

  # When we click the goal, center it on the screen.
  _onGoalClick: (event) ->
    $goal = $ event.currentTarget
    width = $goal.width()
    multiplier = parseInt $goal.position().left / width
    @_centerByPosition width, multiplier
    off

  # When we rotate the device, center the current goal.
  _onOrientationChange: -> @_centerGoal()

  # private
  # 

  # Centers a goal on the screen.
  # Sets a timeout so that if someone starts scrolling again right after they
  #   stopped scrolling, we can cancel this centering business.
  _centerGoal: ->
    @_centerTimeout = setTimeout =>
      width = @view.find('.goal:first').width()
      left  = Math.abs @view.find('.goals').position().left

      remainder  = left / width
      goLeft     = (((left % width) / width) * 100) < 50
      multiplier = if goLeft then Math.floor(remainder) else Math.ceil remainder

      @_centerByPosition width, multiplier
    , 50

  # @param [float] The current width of any individual goal on the screen.
  # @param [int] The index of the goal we want to slide over to.
  # Centers a specific goal on the screen
  # Shows that goal's associated tickets, and hides all the others.
  _centerByPosition: (width, multiplier) ->
    leftPosition = multiplier * width
    @view.animate { scrollLeft: leftPosition }, 200, 'linear'
    $goal = @view.find ".goal:eq(#{multiplier})"
    $(".goal-#{$goal.data('name')}").show().siblings('.tickets').hide()

  # Loops through any new goals.
  # Keeps track of which goals we've looped through.
  # Sets the goal's text to light if necessary.
  # Adds the warning class to our goal if half the budget has been used.
  # Sets the goal's background height.
  _setGoalProgress: ->
    for goal in @view.find '.goal:not(.progressified)'
      $goal = $ goal
      top = 100 - parseFloat $goal.data 'remaining'
      $goal.addClass 'progressified'
      $goal.children('.budget').addClass('light') if top > 10
      $goal.children('.title').addClass('light') if top > 90
      $goal.addClass('warning') if top > 50
      $goal.children('.progress').css top: "#{top}%"
