class Menu {
  constructor() {
    this.home = document.querySelector('#home');
    this.buttons = document.querySelectorAll('#js-menu .btn');
    this.content = document.querySelectorAll('.content');
  }

  toggleActive(element) {
    element.classList.toggle('is-active');
  }

  click(element) {
    console.log(element.target);
  }

  registerClick(element) {
    element.addEventListener('click', this.click);
  }

  init() {
    this.buttons.forEach((el) => this.registerClick(el));
  }
}






/** Initialization */
function init() {
  const element = document.querySelector('#js-menu');
  const menu = new Menu(element);
  menu.init();
}

export default init;
