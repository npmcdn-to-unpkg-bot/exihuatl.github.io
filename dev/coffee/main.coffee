"use strict";

window.validatedata = ($attr, $defaultValue) ->
    if ($attr != undefined)
        return $attr
    return $defaultValue;

window.parseBoolean = (str, $defaultValue) ->
    if (str == 'true')
        return true;
    else if (str == 'false')
        return false;
    else
        return $defaultValue;

window.$devicewidth = $(window).width();
window.$deviceheight = $(window).height();
window.$body = $('body');
mainContent = $('#cog-mainContent')
$cogcontent = $('.cog-content')
$cogbutton = $('.cog-menuList a')

$(document).ready ->

  # slimscroll # -------------------------------------
  $('.cog-content > .inner').slimScroll({
    height: 'auto',
    size: 0
  })

  # animate appear # ---------------------------------
  if $().appear
    if device.mobile() or device.tablet()
      $body.removeClass 'cssAnimate'
    else
      $('.cssAnimate .animated').appear ->
        $this = $(this)

        $this.each ->
            setTimeout ->
              $this.addClass 'activate'
              $this.addClass $this.data 'fx'
            , $this.data 'time'

# mobile button
$('.cog-mobileButton').on 'click', ->
  $cogcontent.removeClass('active').removeClass('toRightGO').removeClass('toLeftGO')
  $cogbutton.removeClass 'active'

# main content state
$('.cog-menuList a').bind 'click', (event) ->
  sectionId = $(this).attr('href')
  activebtn = $(this)
  $clicked = $cogcontent

  event.preventDefault;

  removeProcessing = (doneCallback) ->
    setTimeout doneCallback, 500
    return

  if $clicked.hasClass('js-state--processing')
    event.preventDefault()
    event.stopImmediatePropagation()
    return
  $clicked.addClass 'js-state--processing'
  clearTimeout $timeout1, $timeout2, $timeout1b, $timeout2b
  $($cogcontent).trigger 'load'
  if !$(sectionId).hasClass('active')
    $($cogbutton).removeClass 'active'
    if $(sectionId).hasClass('toRight')
      if $(mainContent).hasClass('toRightGO')
        $($cogcontent).addClass('toRightGO').removeClass 'active'
        $timeout1 = setTimeout((->
          $(sectionId).removeClass('toRightGO').addClass 'active'
          $(activebtn).addClass 'active'
          return
        ), 1000)
      else if $(mainContent).hasClass('toLeftGO')
        $($cogcontent).removeClass 'toLeftGO'
        $($cogcontent).removeClass 'toRightGO'
        $($cogcontent).removeClass 'active'
        $timeout1b = setTimeout((->
          $(sectionId).addClass 'active'
          $(activebtn).addClass 'active'
          $($cogcontent).addClass 'toRightGO'
          return
        ), 1000)
      else
        $(sectionId).addClass 'active'
        $(activebtn).addClass 'active'
        $(mainContent).addClass 'toRightGO'
    else if $(sectionId).hasClass('toLeft')
      if $(mainContent).hasClass('toLeftGO')
        $($cogcontent).addClass('toLeftGO').removeClass 'active'
        $timeout2 = setTimeout((->
          $(sectionId).removeClass('toLeftGO').addClass 'active'
          $(activebtn).addClass 'active'
          return
        ), 1000)
      else if $(mainContent).hasClass('toRightGO')
        $($cogcontent).removeClass 'toRightGO'
        $($cogcontent).removeClass 'toLeftGO'
        $($cogcontent).removeClass 'active'
        $timeout2b = setTimeout((->
          $(sectionId).addClass 'active'
          $(activebtn).addClass 'active'
          $($cogcontent).addClass 'toLeftGO'
          return
        ), 1000)
      else
        $(sectionId).addClass 'active'
        $(activebtn).addClass 'active'
        $(mainContent).addClass 'toLeftGO'
  else
    $($cogcontent).removeClass 'active'
    $($cogbutton).removeClass 'active'
    $($cogcontent).removeClass 'toRightGO'
    $($cogcontent).removeClass 'toLeftGO'
  removeProcessing ->
    $clicked.removeClass 'js-state--processing'
    return
  return false

  # end doc ready ------------------------------------ #
$(window).on 'load', ->
  $preloader = $('.preloader')
  $content = $('.preloader-content')
  setTimeout (->
    $($preloader).addClass('animated').addClass 'fadeOut'
    $($content).addClass('animated').addClass 'fadeOut'
    return
  ), 0
  setTimeout (->
    $($preloader).css('display', 'none').css 'z-index', '-9999'
    return
  ), 500

  $('.cog-progress').each ->
    $this = $(this)
    if ($('body').hasClass('cssAnimate') and $().appear)
      $this.appear (->
        $this.find('.cog-progress-bar').css('width', $this.attr('data-percent') + '%')
      ),
        accX: 0
        accY: -50
    else
      $this.find('.cog-progress-bar').css('width', $this.attr('data-percent') + '%')

  # Gallery
  $gallery = $('.cog-gallery')
  if !(device.mobile() or device.tablet())
    $gallery.packery
      grid: 0
      columnWidth: $(this).find('.grid-sizer')[0]
      rowHeight: $(this).find('.grid-sizer')[0]
    $gallery.find('.item').each (i, itemElem) ->
      # make element draggable with Draggabilly
      draggie = new Draggabilly(itemElem)
      # bind Draggabilly events to Packery
      $gallery.packery 'bindDraggabillyEvents', draggie
      return
    $gallery.find('.item a').click(->
      false
      ).dblclick ->
        window.open(@href)
        false
  $filters = $('.cog-gallery-filters')
  $filters.find('a').on 'click', (e) ->
    e.preventDefault()
    $this = $(this)
    $href = $this.attr('href')
    $('.cog-gallery-filters a').removeClass('active')
    $this.addClass('active')
    if ($href == '*')
      $gallery.find('.item').each ->
        $(this).removeClass('hidden')
    else
      $gallery.find('.item').each ->
        if (!$(this).hasClass($href))
          $(this).addClass('hidden')
        else
          $(this).removeClass('hidden')
    return false

  $portfolioCookie = $.cookie('portfolioHelp')
  if ($portfolioCookie != undefined)
    $('.portfolio-help').css('display', 'none')
  else
    $('.portfolio-help').find('a').on 'click', (e) ->
      e.preventDefault()
      $.cookie('portfolioHelp', '1', { expires: 7 })
      $(this).parent().css('display', 'none')
      return false

  $('.cog-blog').on 'click', (e) ->
    e.preventDefault()
    $this = $(this)
    if ($this.hasClass('open'))
      $this.removeClass('open')
    else
      $('.cog-blog').removeClass('open')
      $this.addClass('open')
    return false

  $('.cog-ajax').magnificPopup
    type: 'ajax'
    mainClass: 'moveDown'
    removalDelay: 500

  # Input Effects
  do ->
  # trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  onInputFocus = (ev) ->
    classie.add ev.target.parentNode, 'input--filled'
    return

  onInputBlur = (ev) ->
    if ev.target.value.trim() == ''
      classie.remove ev.target.parentNode, 'input--filled'
    return

  if !String::trim
    do ->
      # Make sure we trim BOM and NBSP
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

      String::trim = ->
        @replace rtrim, ''

      return
  [].slice.call(document.querySelectorAll('.cog-input-field')).forEach (inputEl) ->
    # in case the input is already filled..
    if inputEl.value.trim() != ''
      classie.add inputEl.parentNode, 'input--filled'
    # events:
    inputEl.addEventListener 'focus', onInputFocus
    inputEl.addEventListener 'blur', onInputBlur
    return
  return

  # h5 Validate
  $('form').h5Validate(errorClass: 'form-error').on 'validate', ->
    jQuery.each $('.validateIt [required]'), ->
      $errormessage = validatedata($(this).attr('data-error-message'), 'This field is required')
      $(this).attr 'placeholder', $errormessage
      return
    return
  $.h5Validate.addPatterns phone: /([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)/

# ---
# generated by js2coffee 2.0.4


$(window).on 'load resize', ->
  #Blog Height
  $blogImageHeight = $('.cog-blog-media').height()
  $('.cog-blog-number').css({
    height: $blogImageHeight,
    width: $blogImageHeight,
    left: $blogImageHeight/4
  })
  $('.cog-blog-number span').css({
    'font-size': $blogImageHeight/2
    'margin-top': $blogImageHeight/4
  })




$('#resume').load ->

  $('.cog-pieChart').each ->
    $this = $(this)
    $cutout = 95
    $color = validatedata($this.attr('data-color'), '#eee')
    options =
      responsive: true
      percentageInnerCutout: $cutout
      segmentShowStroke: false
      showTooltips: false
      animationEasing: 'easeOutBounce'
    doughnutData = [
      {
        value: parseInt($this.attr('data-ct-percentage'))
        color: $color
        label: false
      }
      {
        value: parseInt(100 - $this.attr('data-ct-percentage'))
        color: 'rgba(221,221,221,0.25)'
      }
    ]

    ctx = $this[0].getContext('2d')
    window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options)

