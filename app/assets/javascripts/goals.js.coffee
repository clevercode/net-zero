window.goals = 
  initialize: ->
    @view = $ '.goals-container'
    @view.disableSelection()
    @attachEventListeners()
    @view.find('.goal:eq(0)').click()
    @setGoalProgress()

  on: (event, selector, handler) ->
    @view.on event, selector, $.proxy this, handler

  off: (event) -> @view.off event

  attachEventListeners: ->
    @off '*'
    @on 'scroll', '', '_onScroll'
    @on 'click', '.goal', '_onGoalClick'
    $(window).off('*').on 'orientationchange', $.proxy this, '_onOrientationChange'

  centerGoal: ->
    @_centerTimeout = setTimeout =>
      width = @view.find('.goal:first').width()
      left  = Math.abs @view.find('.goals').position().left

      remainder  = left / width
      goLeft     = (((left % width) / width) * 100) < 50
      multiplier = if goLeft then Math.floor(remainder) else Math.ceil remainder

      @centerByPosition width, multiplier
    , 50

  centerByPosition: (width, multiplier) ->
    leftPosition = multiplier * width
    @view.animate { scrollLeft: leftPosition }, 200, 'linear'
    $goal = @view.find ".goal:eq(#{multiplier})"
    $("table.goal-#{$goal.data('name')}").show().siblings('table').hide()

  setGoalProgress: ->
    for goal in @view.find '.goal'
      $goal = $ goal
      top = 100 - parseFloat $goal.data 'remaining'
      $goal.children('.budget').addClass('light') if top > 10
      $goal.children('.title').addClass('light') if top > 90
      $goal.addClass('warning') if top > 75
      $goal.children('.progress').css top: "#{top}%"

  # Event Handlers
  # 

  _onScroll: (event) ->
    clearTimeout @_centerTimeout
    clearTimeout @_scrollTimeout
    @_scrollTimeout = setTimeout =>
      @centerGoal()
    , 50

  _onGoalClick: (event) ->
    $goal = $ event.currentTarget
    width = $goal.width()
    multiplier = parseInt $goal.position().left / width
    @centerByPosition width, multiplier
    off

  _onOrientationChange: -> @centerGoal()
