(($) ->
  # left: 37, up: 38, right: 39, down: 40,
  # spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  # var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  # function preventDefault(e) {
  #   e = e || window.event;
  #   if (e.preventDefault)
  #     e.preventDefault();
  #   e.returnValue = false;
  # }
  # function keydown(e) {
  #   for (var i = keys.length; i--;) {
  #     if (e.keyCode === keys[i]) {
  #       preventDefault(e);
  #       return;
  #     }
  #   }
  # }
  # function wheel(e) {
  #   preventDefault(e);
  # }
  # function disable_scroll() {
  #   if (window.addEventListener) {
  #     window.addEventListener('DOMMouseScroll', wheel, false);
  #   }
  #   window.onmousewheel = document.onmousewheel = wheel;
  #   document.onkeydown = keydown;
  #   $('body').css({'overflow-y' : 'hidden'});
  # }
  # function enable_scroll() {
  #   if (window.removeEventListener) {
  #     window.removeEventListener('DOMMouseScroll', wheel, false);
  #   }
  #   window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  #   $('body').css({'overflow-y' : ''});
  # }
  methods =
    init: (options) ->
      defaults =
        menuWidth: 240
        edge: 'left'
        closeOnClick: false
      options = $.extend(defaults, options)
      $(this).each ->
        $this = $(this)
        menu_id = $('#' + $this.attr('data-activates'))
        # Set to width

        removeMenu = (restoreNav) ->
          `panning = false`
          `menuOut = false`
          $('#sidenav-overlay').velocity { opacity: 0 },
            duration: 200
            queue: false
            easing: 'easeOutQuad'
            complete: ->
              $(this).remove()
              return
          if `options.edge == 'left'`
            # Reset phantom div
            $('.drag-target').css
              width: ''
              right: ''
              left: '0'
            menu_id.velocity { left: -1 * (options.menuWidth + 10) },
              duration: 200
              queue: false
              easing: 'easeOutCubic'
              complete: ->
                if `restoreNav == true`
                  # Restore Fixed sidenav
                  menu_id.removeAttr 'style'
                  menu_id.css 'width', options.menuWidth
                return
          else
            # Reset phantom div
            $('.drag-target').css
              width: ''
              right: '0'
              left: ''
            menu_id.velocity { right: -1 * (options.menuWidth + 10) },
              duration: 200
              queue: false
              easing: 'easeOutCubic'
              complete: ->
                if `restoreNav == true`
                  # Restore Fixed sidenav
                  menu_id.removeAttr 'style'
                  menu_id.css 'width', options.menuWidth
                return
          return

        if `options.menuWidth != 240`
          menu_id.css 'width', options.menuWidth
        # Add Touch Area
        $('body').append $('<div class="drag-target"></div>')
        if `options.edge == 'left'`
          menu_id.css 'left', -1 * (options.menuWidth + 10)
          $('.drag-target').css 'left': 0
          # Add Touch Area
        else
          menu_id.addClass('right-aligned').css('right', -1 * (options.menuWidth + 10)).css 'left', ''
          $('.drag-target').css 'right': 0
          # Add Touch Area
        # If fixed sidenav, bring menu out
        if menu_id.hasClass('fixed')
          if $(window).width() > 992
            menu_id.css 'left', 0
        # Window resize to reset on large screens fixed
        if menu_id.hasClass('fixed')
          $(window).resize ->
            if window.innerWidth > 992
              # Close menu if window is resized bigger than 992 and user has fixed sidenav
              if `$('#sidenav-overlay').css('opacity') != 0` and menuOut
                removeMenu true
              else
                menu_id.removeAttr 'style'
                menu_id.css 'width', options.menuWidth
            else if `menuOut == false`
              if `options.edge == 'left'`
                menu_id.css 'left', -1 * (options.menuWidth + 10)
              else
                menu_id.css 'right', -1 * (options.menuWidth + 10)
            return
        # if closeOnClick, then add close event for all a tags in side sideNav
        if `options.closeOnClick == true`
          menu_id.on 'click.itemclick', 'a:not(.collapsible-header)', ->
            removeMenu()
            return
        # Touch Event
        panning = false
        menuOut = false
        $('.drag-target').on 'click', ->
          removeMenu()
          return
        $('.drag-target').hammer(prevent_default: false).bind('pan', (e) ->
          if `e.gesture.pointerType == 'touch'`
            direction = e.gesture.direction
            x = e.gesture.center.x
            y = e.gesture.center.y
            velocityX = e.gesture.velocityX
            # If overlay does not exist, create one and if it is clicked, close menu
            if `$('#sidenav-overlay').length == 0`
              overlay = $('<div id="sidenav-overlay"></div>')
              overlay.css('opacity', 0).click ->
                `var overlayPerc`
                removeMenu()
                return
              $('body').append overlay
            # Keep within boundaries
            if `options.edge == 'left'`
              if x > options.menuWidth
                x = options.menuWidth
              else if x < 0
                x = 0
            if `options.edge == 'left'`
              # Left Direction
              if x < options.menuWidth / 2
                menuOut = false
              else if x >= options.menuWidth / 2
                menuOut = true
              menu_id.css 'left', x - options.menuWidth
            else
              # Left Direction
              if x < $(window).width() - options.menuWidth / 2
                menuOut = true
              else if x >= $(window).width() - options.menuWidth / 2
                menuOut = false
              rightPos = -1 * (x - options.menuWidth / 2)
              if rightPos > 0
                rightPos = 0
              menu_id.css 'right', rightPos
            # Percentage overlay
            if `options.edge == 'left'`
              overlayPerc = x / options.menuWidth
              $('#sidenav-overlay').velocity { opacity: overlayPerc },
                duration: 50
                queue: false
                easing: 'easeOutQuad'
            else
              overlayPerc = Math.abs((x - $(window).width()) / options.menuWidth)
              $('#sidenav-overlay').velocity { opacity: overlayPerc },
                duration: 50
                queue: false
                easing: 'easeOutQuad'
          return
        ).bind 'panend', (e) ->
          if `e.gesture.pointerType == 'touch'`
            velocityX = e.gesture.velocityX
            panning = false
            if `options.edge == 'left'`
              # If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
              if menuOut and velocityX <= 0.3 or velocityX < -0.5
                menu_id.velocity { left: 0 },
                  duration: 300
                  queue: false
                  easing: 'easeOutQuad'
                $('#sidenav-overlay').velocity { opacity: 1 },
                  duration: 50
                  queue: false
                  easing: 'easeOutQuad'
                $('.drag-target').css
                  width: '50%'
                  right: 0
                  left: ''
              else if !menuOut or velocityX > 0.3
                menu_id.velocity { left: -1 * (options.menuWidth + 10) },
                  duration: 200
                  queue: false
                  easing: 'easeOutQuad'
                $('#sidenav-overlay').velocity { opacity: 0 },
                  duration: 200
                  queue: false
                  easing: 'easeOutQuad'
                  complete: ->
                    $(this).remove()
                    return
                $('.drag-target').css
                  width: '10px'
                  right: ''
                  left: 0
            else
              if menuOut and velocityX >= -0.3 or velocityX > 0.5
                menu_id.velocity { right: 0 },
                  duration: 300
                  queue: false
                  easing: 'easeOutQuad'
                $('#sidenav-overlay').velocity { opacity: 1 },
                  duration: 50
                  queue: false
                  easing: 'easeOutQuad'
                $('.drag-target').css
                  width: '50%'
                  right: ''
                  left: 0
              else if !menuOut or velocityX < -0.3
                menu_id.velocity { right: -1 * (options.menuWidth + 10) },
                  duration: 200
                  queue: false
                  easing: 'easeOutQuad'
                $('#sidenav-overlay').velocity { opacity: 0 },
                  duration: 200
                  queue: false
                  easing: 'easeOutQuad'
                  complete: ->
                    $(this).remove()
                    return
                $('.drag-target').css
                  width: '10px'
                  right: 0
                  left: ''
          return
        $this.click ->
          if `menuOut == true`
            menuOut = false
            panning = false
            removeMenu()
          else
            if `options.edge == 'left'`
              $('.drag-target').css
                width: '50%'
                right: 0
                left: ''
              menu_id.velocity { left: 0 },
                duration: 300
                queue: false
                easing: 'easeOutQuad'
            else
              $('.drag-target').css
                width: '50%'
                right: ''
                left: 0
              menu_id.velocity { right: 0 },
                duration: 300
                queue: false
                easing: 'easeOutQuad'
              menu_id.css 'left', ''
            overlay = $('<div id="sidenav-overlay"></div>')
            overlay.css('opacity', 0).click ->
              menuOut = false
              panning = false
              removeMenu()
              overlay.velocity { opacity: 0 },
                duration: 300
                queue: false
                easing: 'easeOutQuad'
                complete: ->
                  $(this).remove()
                  return
              return
            $('body').append overlay
            overlay.velocity { opacity: 1 },
              duration: 300
              queue: false
              easing: 'easeOutQuad'
              complete: ->
                menuOut = true
                panning = false
                return
          false
        return
      return
    show: ->
      @trigger 'click'
      return
    hide: ->
      $('#sidenav-overlay').trigger 'click'
      return

  $.fn.sideNav = (methodOrOptions) ->
    if methods[methodOrOptions]
      return methods[methodOrOptions].apply(this, Array::slice.call(arguments, 1))
    else if `typeof methodOrOptions == 'object'` or !methodOrOptions
      # Default to "init"
      return methods.init.apply(this, arguments)
    else
      $.error 'Method ' + methodOrOptions + ' does not exist on jQuery.tooltip'
    return

  # PLugin end
  return
) jQuery
