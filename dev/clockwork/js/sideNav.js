(function() {
  (function($) {
    var methods;
    methods = {
      init: function(options) {
        var defaults;
        defaults = {
          menuWidth: 240,
          edge: 'left',
          closeOnClick: false
        };
        options = $.extend(defaults, options);
        $(this).each(function() {
          var $this, menuOut, menu_id, panning, removeMenu;
          $this = $(this);
          menu_id = $('#' + $this.attr('data-activates'));
          removeMenu = function(restoreNav) {
            panning = false;
            menuOut = false;
            $('#sidenav-overlay').velocity({
              opacity: 0
            }, {
              duration: 200,
              queue: false,
              easing: 'easeOutQuad',
              complete: function() {
                $(this).remove();
              }
            });
            if (options.edge == 'left') {
              $('.drag-target').css({
                width: '',
                right: '',
                left: '0'
              });
              menu_id.velocity({
                left: -1 * (options.menuWidth + 10)
              }, {
                duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav == true) {
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                }
              });
            } else {
              $('.drag-target').css({
                width: '',
                right: '0',
                left: ''
              });
              menu_id.velocity({
                right: -1 * (options.menuWidth + 10)
              }, {
                duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav == true) {
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                }
              });
            }
          };
          if (options.menuWidth != 240) {
            menu_id.css('width', options.menuWidth);
          }
          $('body').append($('<div class="drag-target"></div>'));
          if (options.edge == 'left') {
            menu_id.css('left', -1 * (options.menuWidth + 10));
            $('.drag-target').css({
              'left': 0
            });
          } else {
            menu_id.addClass('right-aligned').css('right', -1 * (options.menuWidth + 10)).css('left', '');
            $('.drag-target').css({
              'right': 0
            });
          }
          if (menu_id.hasClass('fixed')) {
            if ($(window).width() > 992) {
              menu_id.css('left', 0);
            }
          }
          if (menu_id.hasClass('fixed')) {
            $(window).resize(function() {
              if (window.innerWidth > 992) {
                if ($('#sidenav-overlay').css('opacity') != 0 && menuOut) {
                  removeMenu(true);
                } else {
                  menu_id.removeAttr('style');
                  menu_id.css('width', options.menuWidth);
                }
              } else if (menuOut == false) {
                if (options.edge == 'left') {
                  menu_id.css('left', -1 * (options.menuWidth + 10));
                } else {
                  menu_id.css('right', -1 * (options.menuWidth + 10));
                }
              }
            });
          }
          if (options.closeOnClick == true) {
            menu_id.on('click.itemclick', 'a:not(.collapsible-header)', function() {
              removeMenu();
            });
          }
          panning = false;
          menuOut = false;
          $('.drag-target').on('click', function() {
            removeMenu();
          });
          $('.drag-target').hammer({
            prevent_default: false
          }).bind('pan', function(e) {
            var direction, overlay, overlayPerc, rightPos, velocityX, x, y;
            if (e.gesture.pointerType == 'touch') {
              direction = e.gesture.direction;
              x = e.gesture.center.x;
              y = e.gesture.center.y;
              velocityX = e.gesture.velocityX;
              if ($('#sidenav-overlay').length == 0) {
                overlay = $('<div id="sidenav-overlay"></div>');
                overlay.css('opacity', 0).click(function() {
                  var overlayPerc;
                  removeMenu();
                });
                $('body').append(overlay);
              }
              if (options.edge == 'left') {
                if (x > options.menuWidth) {
                  x = options.menuWidth;
                } else if (x < 0) {
                  x = 0;
                }
              }
              if (options.edge == 'left') {
                if (x < options.menuWidth / 2) {
                  menuOut = false;
                } else if (x >= options.menuWidth / 2) {
                  menuOut = true;
                }
                menu_id.css('left', x - options.menuWidth);
              } else {
                if (x < $(window).width() - options.menuWidth / 2) {
                  menuOut = true;
                } else if (x >= $(window).width() - options.menuWidth / 2) {
                  menuOut = false;
                }
                rightPos = -1 * (x - options.menuWidth / 2);
                if (rightPos > 0) {
                  rightPos = 0;
                }
                menu_id.css('right', rightPos);
              }
              if (options.edge == 'left') {
                overlayPerc = x / options.menuWidth;
                $('#sidenav-overlay').velocity({
                  opacity: overlayPerc
                }, {
                  duration: 50,
                  queue: false,
                  easing: 'easeOutQuad'
                });
              } else {
                overlayPerc = Math.abs((x - $(window).width()) / options.menuWidth);
                $('#sidenav-overlay').velocity({
                  opacity: overlayPerc
                }, {
                  duration: 50,
                  queue: false,
                  easing: 'easeOutQuad'
                });
              }
            }
          }).bind('panend', function(e) {
            var velocityX;
            if (e.gesture.pointerType == 'touch') {
              velocityX = e.gesture.velocityX;
              panning = false;
              if (options.edge == 'left') {
                if (menuOut && velocityX <= 0.3 || velocityX < -0.5) {
                  menu_id.velocity({
                    left: 0
                  }, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                  $('#sidenav-overlay').velocity({
                    opacity: 1
                  }, {
                    duration: 50,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                  $('.drag-target').css({
                    width: '50%',
                    right: 0,
                    left: ''
                  });
                } else if (!menuOut || velocityX > 0.3) {
                  menu_id.velocity({
                    left: -1 * (options.menuWidth + 10)
                  }, {
                    duration: 200,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                  $('#sidenav-overlay').velocity({
                    opacity: 0
                  }, {
                    duration: 200,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function() {
                      $(this).remove();
                    }
                  });
                  $('.drag-target').css({
                    width: '10px',
                    right: '',
                    left: 0
                  });
                }
              } else {
                if (menuOut && velocityX >= -0.3 || velocityX > 0.5) {
                  menu_id.velocity({
                    right: 0
                  }, {
                    duration: 300,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                  $('#sidenav-overlay').velocity({
                    opacity: 1
                  }, {
                    duration: 50,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                  $('.drag-target').css({
                    width: '50%',
                    right: '',
                    left: 0
                  });
                } else if (!menuOut || velocityX < -0.3) {
                  menu_id.velocity({
                    right: -1 * (options.menuWidth + 10)
                  }, {
                    duration: 200,
                    queue: false,
                    easing: 'easeOutQuad'
                  });
                  $('#sidenav-overlay').velocity({
                    opacity: 0
                  }, {
                    duration: 200,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete: function() {
                      $(this).remove();
                    }
                  });
                  $('.drag-target').css({
                    width: '10px',
                    right: 0,
                    left: ''
                  });
                }
              }
            }
          });
          $this.click(function() {
            var overlay;
            if (menuOut == true) {
              menuOut = false;
              panning = false;
              removeMenu();
            } else {
              if (options.edge == 'left') {
                $('.drag-target').css({
                  width: '50%',
                  right: 0,
                  left: ''
                });
                menu_id.velocity({
                  left: 0
                }, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad'
                });
              } else {
                $('.drag-target').css({
                  width: '50%',
                  right: '',
                  left: 0
                });
                menu_id.velocity({
                  right: 0
                }, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad'
                });
                menu_id.css('left', '');
              }
              overlay = $('<div id="sidenav-overlay"></div>');
              overlay.css('opacity', 0).click(function() {
                menuOut = false;
                panning = false;
                removeMenu();
                overlay.velocity({
                  opacity: 0
                }, {
                  duration: 300,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function() {
                    $(this).remove();
                  }
                });
              });
              $('body').append(overlay);
              overlay.velocity({
                opacity: 1
              }, {
                duration: 300,
                queue: false,
                easing: 'easeOutQuad',
                complete: function() {
                  menuOut = true;
                  panning = false;
                }
              });
            }
            return false;
          });
        });
      },
      show: function() {
        this.trigger('click');
      },
      hide: function() {
        $('#sidenav-overlay').trigger('click');
      }
    };
    $.fn.sideNav = function(methodOrOptions) {
      if (methods[methodOrOptions]) {
        return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof methodOrOptions == 'object' || !methodOrOptions) {
        return methods.init.apply(this, arguments);
      } else {
        $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
      }
    };
  })(jQuery);

}).call(this);
