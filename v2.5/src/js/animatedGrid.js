/* global Modernizr */
/* global classie */

const bodyElement = document.body;
const documentElement = window.document.documentElement;
const support = {
  transitions: Modernizr.csstransitions,
};
const transEndEventNames = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd',
  msTransition: 'MSTransitionEnd',
  transition: 'transitionend',
};
const transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];
const onEndTransition = (el, callback) => {
  const onEndCallbackFn = function (ev) {
    if (support.transitions) {
      if (ev.target !== this) return;
      this.removeEventListener(transEndEventName, onEndCallbackFn);
    }
    if (callback && typeof callback === 'function') { callback.call(this); }
  };
  if (support.transitions) {
    el.addEventListener(transEndEventName, onEndCallbackFn);
  } else {
    onEndCallbackFn();
  }
};

const gridElement = document.getElementById('theGrid');
const gridItemsContainer = gridElement.querySelector('section.grid');
const contentItemsContainer = gridElement.querySelector('section.content');
const gridItems = gridItemsContainer.querySelectorAll('.grid__item');
const contentItems = contentItemsContainer.querySelectorAll('.content__item');
const closeCtrl = contentItemsContainer.querySelector('.close-button');

let current = -1;
let lockScroll = false;
let xscroll;
let yscroll;
let isAnimating = false;

/**
 * gets the viewport width and height
 * based on http://responsejs.com/labs/dimensions/
 */
function getViewport(axis) {
  let client;
  let inner;
  if (axis === 'x') {
    client = documentElement.clientWidth;
    inner = window.innerWidth;
  } else if (axis === 'y') {
    client = documentElement.clientHeight;
    inner = window.innerHeight;
  }

  return client < inner ? inner : client;
}

function scrollX() { return window.pageXOffset || documentElement.scrollLeft; }
function scrollY() { return window.pageYOffset || documentElement.scrollTop; }
function noscroll() {
  if (!lockScroll) {
    lockScroll = true;
    xscroll = scrollX();
    yscroll = scrollY();
  }
  window.scrollTo(xscroll, yscroll);
}


function loadContent(item) {
  const dummy = document.createElement('div');
  dummy.className = 'placeholder';

  dummy.style.WebkitTransform = `
  translate3d(${(item.offsetLeft - 5)}px, ${(item.offsetTop)}px, 0px)
    scale3d(${item.offsetWidth / gridItemsContainer.offsetWidth},
    ${item.offsetHeight / getViewport('y')}, 1)`;
  dummy.style.transform = `
  translate3d(${(item.offsetLeft - 5)}px, ${(item.offsetTop)}px, 0px)
    scale3d(${item.offsetWidth / gridItemsContainer.offsetWidth},
    ${item.offsetHeight / getViewport('y')}, 1)`;

  dummy.style.background = getComputedStyle(contentItems[current]).backgroundColor;

  classie.add(dummy, 'placeholder--trans-in');
  gridItemsContainer.appendChild(dummy);
  classie.add(bodyElement, 'view-single');

  setTimeout(() => {
    dummy.style.WebkitTransform = `translate3d(-5px, ${(scrollY() - 5)}px, 0px)`;
    dummy.style.transform = `translate3d(-5px, ${(scrollY() - 5)}px, 0px)`;
    window.addEventListener('scroll', noscroll);
  }, 25);

  onEndTransition(dummy, () => {
    classie.remove(dummy, 'placeholder--trans-in');
    classie.add(dummy, 'placeholder--trans-out');
    contentItemsContainer.style.top = `${scrollY()}px`;
    classie.add(contentItemsContainer, 'content--show');
    classie.add(contentItems[current], 'content__item--show');
    classie.add(closeCtrl, 'close-button--show');
    classie.addClass(bodyElement, 'noscroll');

    isAnimating = false;
  });
}

function hideContent() {
  const gridItem = gridItems[current];
  const contentItem = contentItems[current];

  classie.remove(contentItem, 'content__item--show');
  classie.remove(contentItemsContainer, 'content--show');
  classie.remove(closeCtrl, 'close-button--show');
  classie.remove(bodyElement, 'view-single');

  setTimeout(() => {
    const dummy = gridItemsContainer.querySelector('.placeholder');

    classie.removeClass(bodyElement, 'noscroll');

    dummy.style.WebkitTransform = `translate3d(${gridItem.offsetLeft}px,
      ${gridItem.offsetTop}px, 0px)
      scale3d(${gridItem.offsetWidth / gridItemsContainer.offsetWidth},
      ${gridItem.offsetHeight / getViewport('y')}, 1)`;
    dummy.style.transform = `translate3d(${gridItem.offsetLeft}px,
      ${gridItem.offsetTop}px, 0px)
      scale3d(${gridItem.offsetWidth / gridItemsContainer.offsetWidth},
      ${gridItem.offsetHeight / getViewport('y')}, 1)`;

    onEndTransition(dummy, () => {
      contentItem.parentNode.scrollTop = 0;
      gridItemsContainer.removeChild(dummy);
      classie.remove(gridItem, 'grid__item--loading');
      classie.remove(gridItem, 'grid__item--animate');
      lockScroll = false;
      window.removeEventListener('scroll', noscroll);
    });

    current = -1;
  }, 25);
}

function initEvents() {
  [].slice.call(gridItems).forEach((item, pos) => {
    const callback = (ev) => {
      ev.preventDefault();

      if (isAnimating || current === pos) { return false; }
      isAnimating = true;
      current = pos;
      classie.add(item, 'grid__item--loading');
      setTimeout(() => {
        classie.add(item, 'grid__item--animate');

        setTimeout(() => {
          loadContent(item);
        }, 500);
      }, 1000);

      return false;
    };

    item.addEventListener('click', callback);
  });

  closeCtrl.addEventListener('click', () => {
    hideContent();
  });

  document.addEventListener('keydown', (ev) => {
    if (!isAnimating && current !== -1) {
      const keyCode = ev.keyCode || ev.which;
      if (keyCode === 27) {
        ev.preventDefault();
        if ('activeElement' in document) {
          document.activeElement.blur();
        }
        hideContent();
      }
    }
  });
}

function init() {
  initEvents();
}

export default init;
