do ->
  # trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  onInputFocus = (ev) ->
    classie.add ev.target.parentNode, 'input--filled'
    return

  onInputBlur = (ev) ->
    if ev.target.value.trim() == ''
      classie.remove ev.target.parentNode, 'input--filled'
    return

  if !String::trim
    do ->
      # Make sure we trim BOM and NBSP
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

      String::trim = ->
        @replace rtrim, ''

      return
  [].slice.call(document.querySelectorAll('.cog-input-field')).forEach (inputEl) ->
    # in case the input is already filled..
    if inputEl.value.trim() != ''
      classie.add inputEl.parentNode, 'input--filled'
    # events:
    inputEl.addEventListener 'focus', onInputFocus
    inputEl.addEventListener 'blur', onInputBlur
    return
  return
