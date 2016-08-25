/* global Modernizr */
/* global classie */

(() => {
  'use strict';

  const transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd',
    transition: 'transitionend',
  };
  const transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];
  const support = {
    transitions: Modernizr.csstransitions,
  };

  function extend(a, b) {
    const temp = a;
    for (const key in b) {
      if (b.hasOwnProperty(key)) {
        temp[key] = b[key];
      }
    }
    return temp;
  }

  function UIMorphingButton(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  UIMorphingButton.prototype.options = {
    closeEl: '',
    onBeforeOpen() { return false; },
    onAfterOpen() { return false; },
    onBeforeClose() { return false; },
    onAfterClose() { return false; },
  };

  UIMorphingButton.prototype._init = function () {
    // the button
    this.button = document.querySelector('#button');
    // state
    this.expanded = false;
    // content el
    this.contentEl = this.el.querySelector('.morph-content');
    // init events
    this._initEvents();
  };

  UIMorphingButton.prototype._initEvents = function () {
    const self = this;
    // open
    this.button.addEventListener('click', () => { self.toggle(); });
    // close
    if (this.options.closeEl !== '') {
      const closeEl = this.el.querySelector(this.options.closeEl);
      if (closeEl) {
        closeEl.addEventListener('click', () => { self.toggle(); });
      }
    }
  };

  UIMorphingButton.prototype.toggle = function () {
    if (this.isAnimating) return false;

    // callback
    if (this.expanded) {
      this.options.onBeforeClose();
    } else {
      // add class active (solves z-index problem when more than one button is in the page)
      classie.addClass(this.el, 'active');
      this.options.onBeforeOpen();
    }

    this.isAnimating = true;

    const self = this;
    const onEndTransitionFn = function (ev) {
      if (ev.target !== this) return false;

      if (support.transitions) {
        // open: first opacity then width/height/left/top
        // close: first width/height/left/top then opacity
        if (self.expanded && ev.propertyName !== 'opacity'
          || !self.expanded
          && ev.propertyName !== 'width'
          && ev.propertyName !== 'height'
          && ev.propertyName !== 'left'
          && ev.propertyName !== 'top') {
          return false;
        }
        this.removeEventListener(transEndEventName, onEndTransitionFn);
      }
      self.isAnimating = false;

      // callback
      if (self.expanded) {
        // remove class active (after closing)
        classie.removeClass(self.el, 'active');
        self.options.onAfterClose();
      } else {
        self.options.onAfterOpen();
      }

      self.expanded = !self.expanded;

      return false;
    };

    if (support.transitions) {
      this.contentEl.addEventListener(transEndEventName, onEndTransitionFn);
    } else {
      onEndTransitionFn();
    }

    // set the left and top values of the contentEl (same like the button)
    const buttonPos = this.button.getBoundingClientRect();
    // need to reset
    classie.addClass(this.contentEl, 'no-transition');
    this.contentEl.style.left = 'auto';
    this.contentEl.style.top = 'auto';

    // add/remove class "open" to the button wraper
    setTimeout(() => {
      self.contentEl.style.left = `${buttonPos.left}px`;
      self.contentEl.style.top = `${buttonPos.top}px`;

      if (self.expanded) {
        classie.removeClass(self.contentEl, 'no-transition');
        classie.removeClass(self.el, 'open');
      } else {
        setTimeout(() => {
          classie.removeClass(self.contentEl, 'no-transition');
          classie.addClass(self.el, 'open');
        }, 25);
      }
    }, 25);

    return false;
  };

  // add to global namespace
  window.UIMorphingButton = UIMorphingButton;
})();
