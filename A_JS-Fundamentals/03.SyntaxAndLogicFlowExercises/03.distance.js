function distance(arr) {
    let speedAkmH = arr[0];
    let speedBkmH = arr[1];
    let timeInSeconds = arr[2];

    let hourValue = timeInSeconds / 60 / 60;

    let distanceTravelledAmeters = speedAkmH * hourValue * 1000;
    let distanceTravelledBmeters = speedBkmH * hourValue * 1000;

    console.log(Math.abs(distanceTravelledAmeters - distanceTravelledBmeters))
}

distance([11, 10, 120])