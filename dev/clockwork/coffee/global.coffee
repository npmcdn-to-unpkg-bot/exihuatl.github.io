Clockwork = {}
# Unique ID
Clockwork.guid = do ->

  s4 = ->
    Math.floor((1 + Math.random()) * 0x10000).toString(16).substring 1

  ->
    s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()

Clockwork.elementOrParentIsFixed = (element) ->
  $element = $(element)
  $checkElements = $element.add($element.parents())
  isFixed = false
  $checkElements.each ->
    if $(this).css('position') == 'fixed'
      isFixed = true
      return false
    return
  isFixed

# Velocity has conflicts when loaded with jQuery, this will check for it
Vel = undefined
if $
  Vel = $.Velocity
else
  Vel = Velocity

validatedata = ($attr, $defaultValue) ->
  'use strict'
  if $attr != undefined
    return $attr
  $defaultValue

parseBoolean = (str, $defaultValue) ->
  'use strict'
  if str == 'true'
    return true
  else if str == 'false'
    return false
  $defaultValue
