function attachEventsListeners() {
    let inputDays = document.getElementById('daysBtn');
    let inputHours = document.getElementById('hoursBtn');
    let inputMinutes = document.getElementById('minutesBtn');
    let inputSeconds = document.getElementById('secondsBtn');

    function calcDays() {
        let mainValue = Number(document.getElementById('days').value);
        let hours = document.getElementById('hours');
        hours.value = mainValue * 24;
        let minutes = document.getElementById('minutes');
        minutes.value = mainValue * 24 * 60;
        let seconds = document.getElementById('seconds');
        seconds.value = mainValue * 24 * 60 * 60;
    }
    function calcHours() {
        let mainValue = Number(document.getElementById('hours').value);
        let days = document.getElementById('days');
        days.value = mainValue / 24;
        let minutes = document.getElementById('minutes');
        minutes.value = mainValue * 60;
        let seconds = document.getElementById('seconds');
        seconds.value = mainValue * 60 * 60;
    }
    function calcMinutes() {
        let mainValue = Number(document.getElementById('minutes').value);
        let days = document.getElementById('days');
        days.value = mainValue / 24 / 60;
        let hours = document.getElementById('hours');
        hours.value = mainValue / 60;
        let seconds = document.getElementById('seconds');
        seconds.value = mainValue * 60;
    }
    function calcSeconds() {
        let mainValue = Number(document.getElementById('seconds').value);
        let days = document.getElementById('days');
        days.value = mainValue / 24 / 60 / 60;
        let hours = document.getElementById('hours');
        hours.value = mainValue / 60 / 60;
        let minutes = document.getElementById('minutes');
        minutes.value = mainValue / 60;
    }

    inputDays.addEventListener('click', calcDays);
    inputHours.addEventListener('click', calcHours);
    inputMinutes.addEventListener('click', calcMinutes);
    inputSeconds.addEventListener('click', calcSeconds);
}
