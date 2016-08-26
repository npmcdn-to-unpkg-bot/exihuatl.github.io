(function() {
  (function($) {
    $.fn.scrollTo = function(elem) {
      $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
      return this;
    };
    $.fn.dropdown = function(option) {
      var defaults;
      defaults = {
        inDuration: 300,
        outDuration: 225,
        constrain_width: true,
        hover: true,
        gutter: 0,
        belowOrigin: false
      };
      this.each(function() {
        var activates, hideDropdown, open, options, origin, placeDropdown, updateOptions;
        origin = $(this);
        options = $.extend({}, defaults, option);
        activates = $('#' + origin.attr('data-activates'));
        updateOptions = function() {
          if (origin.data('induration') !== void 0) {
            options.inDuration = origin.data('inDuration');
          }
          if (origin.data('outduration') !== void 0) {
            options.outDuration = origin.data('outDuration');
          }
          if (origin.data('constrainwidth') !== void 0) {
            options.constrain_width = origin.data('constrainwidth');
          }
          if (origin.data('hover') !== void 0) {
            options.hover = origin.data('hover');
          }
          if (origin.data('gutter') !== void 0) {
            options.gutter = origin.data('gutter');
          }
          if (origin.data('beloworigin') !== void 0) {
            options.belowOrigin = origin.data('beloworigin');
          }
        };

        /*
          Helper function to position and resize dropdown.
          Used in hover and click handler.
         */
        placeDropdown = function() {
          var gutter_spacing, offset, offsetLeft, width_difference;
          updateOptions();
          if (options.constrain_width === true) {
            activates.css('width', origin.outerWidth());
          }
          offset = 0;
          if (options.belowOrigin === true) {
            offset = origin.height();
          }
          offsetLeft = origin.offset().left;
          width_difference = 0;
          gutter_spacing = options.gutter;
          if (offsetLeft + activates.innerWidth() > $(window).width()) {
            width_difference = origin.innerWidth() - activates.innerWidth();
            gutter_spacing = gutter_spacing * -1;
          }
          activates.css({
            position: 'absolute',
            left: 0 + width_difference + gutter_spacing
          });
          activates.stop(true, true).css('opacity', 0).slideDown({
            queue: false,
            duration: options.inDuration,
            easing: 'easeOutCubic',
            complete: function() {
              $(this).css('height', '');
            }
          }).animate({
            opacity: 1
          }, {
            queue: false,
            duration: options.inDuration,
            easing: 'easeOutSine'
          });
        };
        hideDropdown = function() {
          activates.fadeOut(options.outDuration);
        };
        updateOptions();
        if (origin.hasClass('select-dropdown')) {
          origin.after(activates);
        } else {
          origin.append(activates);
        }
        activates.on('hover', function(e) {
          e.stopPropagation();
        });
        if (options.hover) {
          origin.unbind('click.' + origin.attr('id'));
          origin.on('mouseenter', function(e) {
            placeDropdown();
          });
          origin.on('mouseleave', function(e) {
            activates.stop(true, true);
            hideDropdown();
          });
        } else {
          open = false;
          origin.unbind('click.' + origin.attr('id'));
          origin.bind('click.' + origin.attr('id'), function(e) {
            if (origin.hasClass('select-dropdown')) {
              return false;
            }
            if (origin[0] === e.currentTarget && $(e.target).closest('.dropdown-content').length === 0) {
              e.preventDefault();
              placeDropdown();
              open = true;
            } else {
              if (open === true) {
                hideDropdown();
                $(document).unbind('click.' + activates.attr('id'));
                open = false;
              }
            }
            if (open === true) {
              $(document).bind('click.' + activates.attr('id'), function(e) {
                if (!activates.is(e.target) && !origin.is(e.target) && !origin.find(e.target).length > 0) {
                  hideDropdown();
                  $(document).unbind('click.' + activates.attr('id'));
                }
              });
            }
          });
        }
        origin.on('open', placeDropdown);
        origin.on('close', hideDropdown);
      });
    };
    $(document).ready(function() {
      $('.dropdown').dropdown();
    });
  })(jQuery);

}).call(this);
