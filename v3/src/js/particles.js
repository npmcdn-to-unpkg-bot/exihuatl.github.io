/* global jQuery */
/* global TimelineLite */
/* global TweenLite */
/* global Linear */

(() => {
  const $ = jQuery;

  const $emitter = $('#emitter');
  const tl = new TimelineLite();

  // https://gist.github.com/timohausmann/4997906
  Math.randMinMax = (t, n, a) => {
    let r = t + Math.random() * (n - t);
    return a && (r = Math.round(r)), r;
  };

  for (let i = 0; i < 40; i++) {
    const x = Math.randMinMax(-200, 200);
    const y = Math.randMinMax(-200, 50);
    const z = Math.randMinMax(-200, 200);
    const degree = Math.randMinMax(0, 360);
    const $particle = $('<div class="particle" />'); // create a new particle
    const color = `hsla(${Math.randMinMax(200, 320)}, 80%, 60%, 1)`;
        // even particles will be larger circles
    if (i % 2 === 0) {
      TweenLite.set($particle, {
        borderRadius: '50%',
        width: 20,
        height: 20,
      });
    }

    $particle.css('background', color);  // change color
    $emitter.append($particle);  // add it to emitter

    tl.to($particle, Math.randMinMax(1, 2), {
      x,
      y,
      z,
      opacity: 0,
      rotationX: degree,
      repeat: -1,
      repeatDelay: Math.randMinMax(0, 2),
    }, Math.randMinMax(0, 2));
  }

  tl.fromTo($emitter, 4, {
    rotationY: 0,
    rotationZ: -180 }, {
      rotationY: 360,
      rotationZ: 180,
      ease: Linear.easeNone,
      repeat: -1,
    }, 0);
})();

