/** Set element position
 * @param {HTMLElement} element
 */
function setPosition(element, position) {
  switch (position) {
    case 'left': {
      element.forEach((el) => el.setAttribute('data-position', 'left'));
      break;
    }
    case 'right': {
      element.forEach((el) => el.setAttribute('data-position', 'right'));
      break;
    }
    default: {
      element.forEach((el) => el.setAttribute('data-position', 'center'));
    }
  }
}

/** Register menu clicks
 * @param {HTMLElement} element
 */
function clicky(element) {
  const home = document.querySelector('#home');
  const content = document.querySelectorAll('.content');

  element.addEventListener('click', () => {
    const homePosition = home.getAttribute('data-position');
    const target = document.querySelector(element.getAttribute('data-target'));
    const position = target.getAttribute('data-position');
    const move = target.getAttribute('data-move');

    /** Reset Positions */
    if (target.classList.contains('is-active')) {
      target.classList.remove('is-active');
      setPosition(content);
      return false;
    } else {
      target.classList.add('is-active');
    }

    content.forEach((el) => {
      if (el !== target) {
        el.classList.remove('is-active');
      }
    });


    if (homePosition === 'center') {
      if (move === 'left') {
        setPosition(content, 'right');
      } else {
        setPosition(content, 'left');
      }
      target.setAttribute('data-position', move);
    } else {
      if (homePosition === position) {
        setPosition(content, 'right');
      } else {
        setPosition(content, 'left');
      }
      setTimeout(() => {
        target.setAttribute('data-position', move);
      }, 1000);
    }

    return false;
  });
}

/** Initialization */
function init() {
  const menu = document.querySelector('#js-menu');
  menu.querySelectorAll('.btn').forEach(clicky);
}

export default init;
