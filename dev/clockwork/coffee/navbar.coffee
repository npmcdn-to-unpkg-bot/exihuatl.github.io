# navbar function #

lastScrollTop = 0;
$navfixed = $('.navbar-fixed nav')
$navheight = parseInt($('.navbar-fixed nav').css('height'))

# on scroll function #
$(window).scroll ->

  st = $(this).scrollTop();

  # scroll to top # --------------------
  if st > lastScrollTop

    $four = lastScrollTop - st
    $five = parseInt($navfixed.css('top'))

    $six = $four + $five
    $navfixed.css('top', $six + 'px')

    if $six < -$navheight
      $navfixed.css('top', -$navheight + 'px')
  # ------------------------------------ #
  else # scroll to bottom #
    $one = lastScrollTop - st
    $two = parseInt($navfixed.css('top'))

    $three = $two + $one
    $navfixed.css('top', $three + 'px')

    if $three > 0
      $navfixed.css('top', 0)
  # ------------------------------------ #
  lastScrollTop = st
