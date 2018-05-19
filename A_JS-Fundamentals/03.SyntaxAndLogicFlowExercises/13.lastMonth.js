function lastDayOfPrevMonth(arr) {
    // 0 for day value will return the last day from previous month
    let currentDate = new Date(arr[2], arr[1] - 1, 0)
    console.log(currentDate.getDate())
}

lastDayOfPrevMonth([17, 3, 2002])
