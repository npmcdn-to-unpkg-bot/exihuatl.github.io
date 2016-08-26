/* global SimpleScrollbar */
/* global UIMorphingButton */
/* global classie */

import './menu';
import './morphButton';
import './particles';
import './simple-scrollbar';

SimpleScrollbar.initEl(document.querySelector('.morph-content'));


(() => {
  const docElem = window.document.documentElement;
  let didScroll;
  let scrollPosition;

  function scrollPage() {
    scrollPosition = {
      x: window.pageXOffset || docElem.scrollLeft,
      y: window.pageYOffset || docElem.scrollTop,
    };
    didScroll = false;
  }

  function scrollHandler() {
    if (!didScroll) {
      didScroll = true;
      setTimeout(() => { scrollPage(); }, 60);
    }
  }

  // trick to prevent scrolling when opening/closing button
  function noScrollFn() {
    window.scrollTo(scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0);
  }

  function noScroll() {
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', noScrollFn);
  }

  function scrollFn() {
    window.addEventListener('scroll', scrollHandler);
  }

  function canScroll() {
    window.removeEventListener('scroll', noScrollFn);
    scrollFn();
  }

  scrollFn();

  const morphWrapper = document.querySelectorAll('.morph-wrapper');
  const morphButtons = document.querySelectorAll('.menu-item-button');

  Array.prototype.forEach.call(morphButtons, (el, i) => {
    const wrapper = morphWrapper[i];
    const content = wrapper.querySelector('.morph-content');

    const morph = new UIMorphingButton(wrapper, {
      closeEl: '.icon-close',
      element: el,
      content,
      onBeforeOpen() {
        // don't allow to scroll
        noScroll();
      },
      onAfterOpen() {
        // can scroll again
        canScroll();
        // add class "noscroll" to body
        classie.addClass(document.body, 'noscroll');
        // add scroll class to main el
        classie.addClass(el, 'scroll');
      },
      onBeforeClose() {
        // remove class "noscroll" to body
        classie.removeClass(document.body, 'noscroll');
        // remove scroll class from main el
        classie.removeClass(el, 'scroll');
        // don't allow to scroll
        noScroll();
      },
      onAfterClose() {
        // can scroll again
        canScroll();
      },
    });
  });


  // end
})();
