function timer() {
  $('#start-timer').on('click', start);
  $('#stop-timer').on('click', stop);

  let increaser = 1;
  let breakIt = null;

  function start() {
    if (breakIt === null) {
      breakIt = setInterval(clicker, 1000);
    }
  }

  function clicker() {
    $('#seconds').text(('0' + (increaser % 60)).slice(-2));
    $('#minutes').text(('0' + Math.floor((increaser / 60) % 60)).slice(-2));
    $('#hours').text(('0' + Math.floor(increaser / 60 / 60)).slice(-2));
    increaser++;
  }

  function stop() {
    clearInterval(breakIt);
    breakIt = null;
  }
}
