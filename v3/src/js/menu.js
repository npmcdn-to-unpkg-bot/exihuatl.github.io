/* global TweenMax */
/* global Quint */
/* global Quad */
/* global Elastic */

const menuItems = document.querySelectorAll('.menu-item');
const menuItemNum = menuItems.length;
const angle = 180;
const distance = 90;
const startingAngle = 90;
const slice = angle / (menuItemNum - 1);
TweenMax.globalTimeScale(0.8);

Array.prototype.forEach.call(menuItems, (el, i) => {
  const currentAngle = startingAngle + (slice * i);
  const element = el;

  element.style.transform = `rotate(${currentAngle}deg)`;
  element.querySelector('.menu-item-icon').style.transform = `rotate${currentAngle}deg`;
});

let on = false;

document.querySelector('.menu-toggle-button').addEventListener('mousedown', () => {
  TweenMax.to(document.querySelector('.menu-toggle-icon'), 0.1, {
    scale: 0.65,
  });
});

document.addEventListener('mouseup', () => {
  TweenMax.to(document.querySelector('.menu-toggle-icon'), 0.1, {
    scale: 1,
  });
});


function openMenu() {
  Array.prototype.forEach.call(document.querySelectorAll('.menu-item'), (el, i) => {
    const delay = i * 0.08;

    const bounce = el.querySelectorAll('.menu-item-bounce');

    TweenMax.fromTo(bounce, 0.2, {
      transformOrigin: '50% 50%',
    }, {
      delay,
      scaleX: 0.8,
      scaleY: 1.2,
      force3D: true,
      ease: Quad.easeInOut,
      onComplete() {
        TweenMax.to(bounce, 0.15, {
          // scaleX:1.2,
          scaleY: 0.7,
          force3D: true,
          ease: Quad.easeInOut,
          onComplete() {
            TweenMax.to(bounce, 3, {
              // scaleX:1,
              scaleY: 0.8,
              force3D: true,
              ease: Elastic.easeOut,
              easeParams: [1.1, 0.12],
            });
          },
        });
      },
    });

    TweenMax.to(el.querySelector('.menu-item-button'), 0.5, {
      delay,
      y: distance,
      force3D: true,
      ease: Quint.easeInOut,
    });
  });
}

function closeMenu() {
  Array.prototype.forEach.call(document.querySelectorAll('.menu-item'), (el, i) => {
    const delay = i * 0.08;

    const bounce = el.querySelectorAll('.menu-item-bounce');

    TweenMax.fromTo(bounce, 0.2, {
      transformOrigin: '50% 50%',
    }, {
      delay,
      scaleX: 1,
      scaleY: 0.8,
      force3D: true,
      ease: Quad.easeInOut,
      onComplete() {
        TweenMax.to(bounce, 0.15, {
          // scaleX:1.2,
          scaleY: 1.2,
          force3D: true,
          ease: Quad.easeInOut,
          onComplete() {
            TweenMax.to(bounce, 3, {
              // scaleX:1,
              scaleY: 1,
              force3D: true,
              ease: Elastic.easeOut,
              easeParams: [1.1, 0.12],
            });
          },
        });
      },
    });


    TweenMax.to(el.querySelector('.menu-item-button'), 0.3, {
      delay,
      y: 0,
      force3D: true,
      ease: Quint.easeIn,
    });
  });
}


function pressHandler() {
  on = !on;

  TweenMax.to(document.querySelectorAll('.menu-toggle-icon'), 0.4, {
    rotation: on ? 45 : 0,
    ease: Quint.easeInOut,
    force3D: true,
  });

  if (on) {
    openMenu();
  } else {
    closeMenu();
  }
}

document.querySelector('.menu-toggle-button').addEventListener('mousedown', pressHandler);

