import MorphContent from './MorphContent/MorphContent';

var elements = document.querySelectorAll(".morph");
Array.prototype.forEach.call(elements, function(el, i){
  const morphContent = new MorphContent(el, { name: 'Maciej' });
  morphContent.init();

});
