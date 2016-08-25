var $emitter = $('#emitter');
var tl = new TimelineLite();

//https://gist.github.com/timohausmann/4997906
Math.randMinMax=function(t,n,a){var r=t+Math.random()*(n-t)
return a&&(r=Math.round(r)),r}

for (var i = 0; i < 40; i++){
  var x = Math.randMinMax(-200, 200),
      y = Math.randMinMax(-200, 50),
      z = Math.randMinMax(-200, 200),
      degree = Math.randMinMax(0, 360),
      $particle = $('<div class="particle" />'), //create a new particle
      color = 'hsla(' + Math.randMinMax(200, 320) + ', 80%, 60%, 1)';
      //even particles will be larger circles
      if(i%2 == 0){
        console.log("i = " + i%2)
        TweenLite.set($particle, {borderRadius:"50%", width:20, height:20})
      }


      $particle.css('background', color);  //change color
      $emitter.append( $particle );  //add it to emitter


  //for each particle insert a repeating tween into a timeline with a random duration, random repeatDelay at a random time
  tl.to($particle, Math.randMinMax(1, 2), {x:x, y:y, z:z, opacity:0, rotationX:degree,
                                          repeat:-1, repeatDelay:Math.randMinMax(0, 2)}, Math.randMinMax(0, 2))
}
//rotate the emitter in 3D space. remove next line to see how it works without the spin
tl.fromTo($emitter, 4, {rotationY:0, rotationZ:-180}, {rotationY:360, rotationZ:180, ease:Linear.easeNone, repeat:-1}, 0)


