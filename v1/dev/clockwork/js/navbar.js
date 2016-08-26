(function() {
  var $navfixed, $navheight, lastScrollTop;

  lastScrollTop = 0;

  $navfixed = $('.navbar-fixed nav');

  $navheight = parseInt($('.navbar-fixed nav').css('height'));

  $(window).scroll(function() {
    var $five, $four, $one, $six, $three, $two, st;
    st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $four = lastScrollTop - st;
      $five = parseInt($navfixed.css('top'));
      $six = $four + $five;
      $navfixed.css('top', $six + 'px');
      if ($six < -$navheight) {
        $navfixed.css('top', -$navheight + 'px');
      }
    } else {
      $one = lastScrollTop - st;
      $two = parseInt($navfixed.css('top'));
      $three = $two + $one;
      $navfixed.css('top', $three + 'px');
      if ($three > 0) {
        $navfixed.css('top', 0);
      }
    }
    return lastScrollTop = st;
  });

}).call(this);
