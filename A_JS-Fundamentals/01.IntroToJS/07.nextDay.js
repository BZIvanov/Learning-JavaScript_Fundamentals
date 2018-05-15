function nextDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    let oneDay = 24 * 60 * 60 * 1000 // miliseconds in 1 day
    let nextDay = new Date(date.getTime() + oneDay)
    console.log(nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate())
}

nextDay(2016, 9, 30)