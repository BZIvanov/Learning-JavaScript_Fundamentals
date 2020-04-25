function attachEvents() {
  $('a').on('click', customize);

  function customize() {
    $('a').removeClass('selected');
    $(this).addClass('selected');
  }
}
