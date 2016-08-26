(($) ->
  # Add posibility to scroll to selected option
  # usefull for select for example

  $.fn.scrollTo = (elem) ->
    $(this).scrollTop $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
    this

  $.fn.dropdown = (option) ->
    defaults =
      inDuration: 300
      outDuration: 225
      constrain_width: true
      hover: true,
      gutter: 0
      belowOrigin: false
    @each ->
      origin = $(this)
      options = $.extend({}, defaults, option)
      # Dropdown menu
      activates = $('#' + origin.attr('data-activates'))

      updateOptions = ->
        if origin.data('induration') != undefined
          options.inDuration = origin.data('inDuration')
        if origin.data('outduration') != undefined
          options.outDuration = origin.data('outDuration')
        if origin.data('constrainwidth') != undefined
          options.constrain_width = origin.data('constrainwidth')
        if origin.data('hover') != undefined
          options.hover = origin.data('hover')
        if origin.data('gutter') != undefined
          options.gutter = origin.data('gutter')
        if origin.data('beloworigin') != undefined
          options.belowOrigin = origin.data('beloworigin')
        return

      ###
        Helper function to position and resize dropdown.
        Used in hover and click handler.
      ###

      placeDropdown = ->
        # Check html data attributes
        updateOptions()
        # Constrain width
        if options.constrain_width == true
          activates.css 'width', origin.outerWidth()
        offset = 0
        if options.belowOrigin == true
          offset = origin.height()
        # Handle edge alignment
        offsetLeft = origin.offset().left
        width_difference = 0
        gutter_spacing = options.gutter
        if offsetLeft + activates.innerWidth() > $(window).width()
          width_difference = origin.innerWidth() - activates.innerWidth()
          gutter_spacing = gutter_spacing * -1
        # If fixed placement
        activates.css
          position: 'absolute'
          left: 0 + width_difference + gutter_spacing
        # Show dropdown
        activates.stop(true, true).css('opacity', 0).slideDown(
          queue: false
          duration: options.inDuration
          easing: 'easeOutCubic'
          complete: ->
            $(this).css 'height', ''
            return
        ).animate { opacity: 1 },
          queue: false
          duration: options.inDuration
          easing: 'easeOutSine'
        return

      hideDropdown = ->
        activates.fadeOut options.outDuration
        return

      updateOptions()
      # Attach dropdown to its activator
      if origin.hasClass('select-dropdown')
        origin.after activates
      else
        origin.append activates
      activates.on 'hover', (e) ->
        e.stopPropagation()
        return
      # Hover
      if options.hover
        origin.unbind 'click.' + origin.attr('id')
        # Hover handler to show dropdown
        origin.on 'mouseenter', (e) ->
          # Mouse over
          placeDropdown()
          return
        origin.on 'mouseleave', (e) ->
          # Mouse out
          activates.stop true, true
          hideDropdown()
          return
        # Click
      else
        open = false
        # Click handler to show dropdown
        origin.unbind 'click.' + origin.attr('id')
        origin.bind 'click.' + origin.attr('id'), (e) ->
          # Handles case for select plugin
          if origin.hasClass('select-dropdown')
            return false
          if origin[0] == e.currentTarget and $(e.target).closest('.dropdown-content').length == 0
            e.preventDefault()
            # Prevents button click from moving window
            placeDropdown()
            open = true
          else
            if open == true
              hideDropdown()
              $(document).unbind 'click.' + activates.attr('id')
              open = false
          # If menu open, add click close handler to document
          if open == true
            $(document).bind 'click.' + activates.attr('id'), (e) ->
              if !activates.is(e.target) and !origin.is(e.target) and !origin.find(e.target).length > 0
                hideDropdown()
                $(document).unbind 'click.' + activates.attr('id')
              return
          return
      # End else
      # Listen to open and close event - useful for select component
      origin.on 'open', placeDropdown
      origin.on 'close', hideDropdown
      return
    return

  # End dropdown plugin
  $(document).ready ->
    $('.dropdown').dropdown()
    return
  return
) jQuery
