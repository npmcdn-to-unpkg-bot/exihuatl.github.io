/** Register menu clicks
 * @param {HTMLElement} element
 */
function clicky(element) {
  const home = document.querySelector('#home');
  const content = document.querySelectorAll('.content');

  element.addEventListener('click', () => {
    const homePosition = home.getAttribute('data-position');
    const position = element.getAttribute('data-position');
    const target = document.querySelector(element.getAttribute('data-target'));
    const move = target.getAttribute('data-move');

    if (homePosition === 'center') {
      if (move === 'left') {
        content.forEach((el) => el.setAttribute('data-position', 'right'));
      } else {
        content.forEach((el) => el.setAttribute('data-position', 'left'));
      }
    } else {
      if (homePosition === position) {
        content.forEach((el) => el.setAttribute('data-position', 'right'));
      } else {
        content.forEach((el) => el.setAttribute('data-position', 'left'));
      }
    }
    target.setAttribute('data-position', move);
  });
}

/** Initialization */
function init() {
  const menu = document.querySelector('#js-menu');
  menu.querySelectorAll('.btn').forEach(clicky);
}

export default init;
