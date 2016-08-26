(function() {
  (function() {
    var onInputBlur, onInputFocus;
    onInputFocus = function(ev) {
      classie.add(ev.target.parentNode, 'input--filled');
    };
    onInputBlur = function(ev) {
      if (ev.target.value.trim() === '') {
        classie.remove(ev.target.parentNode, 'input--filled');
      }
    };
    if (!String.prototype.trim) {
      (function() {
        var rtrim;
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }
    [].slice.call(document.querySelectorAll('.cog-input-field')).forEach(function(inputEl) {
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--filled');
      }
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });
  })();

}).call(this);
