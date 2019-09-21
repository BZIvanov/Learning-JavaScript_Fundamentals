function carFactory(obj) {
    let enginePower = 0;
    let volumeValue = 0;
    if (obj.power <= 90) {
        enginePower = 90;
        volumeValue = 1800;
    } else if (obj.power <= 120) {
        enginePower = 120;
        volumeValue = 2400;
    } else {
        enginePower = 200;
        volumeValue = 3500;
    }

    if (obj.wheelsize % 2 === 0) {
        obj.wheelsize--;
    }

    let result = {
        model: obj.model,
        engine: {
            power: enginePower,
            volume: volumeValue
        },
        carriage: {
            type: obj.carriage,
            color: obj.color
        },
        wheels: [obj.wheelsize, obj.wheelsize, obj.wheelsize, obj.wheelsize]
    }

    return result;
}
console.log(carFactory({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 }
));
