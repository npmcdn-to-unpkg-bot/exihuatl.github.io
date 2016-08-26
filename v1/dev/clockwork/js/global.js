(function() {
  var Clockwork, Vel, parseBoolean, validatedata;

  Clockwork = {};

  Clockwork.guid = (function() {
    var s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
  })();

  Clockwork.elementOrParentIsFixed = function(element) {
    var $checkElements, $element, isFixed;
    $element = $(element);
    $checkElements = $element.add($element.parents());
    isFixed = false;
    $checkElements.each(function() {
      if ($(this).css('position') === 'fixed') {
        isFixed = true;
        return false;
      }
    });
    return isFixed;
  };

  Vel = void 0;

  if ($) {
    Vel = $.Velocity;
  } else {
    Vel = Velocity;
  }

  validatedata = function($attr, $defaultValue) {
    'use strict';
    if ($attr !== void 0) {
      return $attr;
    }
    return $defaultValue;
  };

  parseBoolean = function(str, $defaultValue) {
    'use strict';
    if (str === 'true') {
      return true;
    } else if (str === 'false') {
      return false;
    }
    return $defaultValue;
  };

}).call(this);
