window.goals = 
  initialize: ->
    slider = $('.goals-container').disableSelection().unslider
      delay: no
      fluid: yes
      items: '.goals'
      item:  '.goal'

    @_slider = slider.data 'unslider'
    @_slider.stop()
