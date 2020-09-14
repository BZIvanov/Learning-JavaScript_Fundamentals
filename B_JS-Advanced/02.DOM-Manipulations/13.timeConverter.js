function attachEventsListeners() {
  const inputDays = document.getElementById('daysBtn');
  const inputHours = document.getElementById('hoursBtn');
  const inputMinutes = document.getElementById('minutesBtn');
  const inputSeconds = document.getElementById('secondsBtn');

  function calcDays() {
    const mainValue = Number(document.getElementById('days').value);
    const hours = document.getElementById('hours');
    hours.value = mainValue * 24;
    const minutes = document.getElementById('minutes');
    minutes.value = mainValue * 24 * 60;
    const seconds = document.getElementById('seconds');
    seconds.value = mainValue * 24 * 60 * 60;
  }
  function calcHours() {
    const mainValue = Number(document.getElementById('hours').value);
    const days = document.getElementById('days');
    days.value = mainValue / 24;
    const minutes = document.getElementById('minutes');
    minutes.value = mainValue * 60;
    const seconds = document.getElementById('seconds');
    seconds.value = mainValue * 60 * 60;
  }
  function calcMinutes() {
    const mainValue = Number(document.getElementById('minutes').value);
    const days = document.getElementById('days');
    days.value = mainValue / 24 / 60;
    const hours = document.getElementById('hours');
    hours.value = mainValue / 60;
    const seconds = document.getElementById('seconds');
    seconds.value = mainValue * 60;
  }
  function calcSeconds() {
    const mainValue = Number(document.getElementById('seconds').value);
    const days = document.getElementById('days');
    days.value = mainValue / 24 / 60 / 60;
    const hours = document.getElementById('hours');
    hours.value = mainValue / 60 / 60;
    const minutes = document.getElementById('minutes');
    minutes.value = mainValue / 60;
  }

  inputDays.addEventListener('click', calcDays);
  inputHours.addEventListener('click', calcHours);
  inputMinutes.addEventListener('click', calcMinutes);
  inputSeconds.addEventListener('click', calcSeconds);
}
