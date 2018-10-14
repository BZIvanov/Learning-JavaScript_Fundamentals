function flightSchedule(arr) {
    let flights = arr[0];
    let actions = arr[1];
    let act = arr[2][0];
    let result = [];

    let affected = actions.map((x) =>  x = x.split(' ')[0])

    if(act === 'Cancelled') {
        let canceledFlights = flights.filter((x) => {
            for(let af of affected) {
                if(x.indexOf(af) > -1) {
                    return true;
                }
            }
            return false;
        })
        for(let cf of canceledFlights) {
            cf = cf.split(' ');
            let tempObj = { 
                Destination: cf[1], 
                Status: 'Cancelled' 
            }
            result.push(tempObj);
        };
    } else if(act === 'Ready to fly') {
        let notCanceledFlights = flights.filter((x) => {
            for(let af of affected) {
                if(x.indexOf(af) > -1) {
                    return false;
                }
            }
            return true;
        })
        for(let cf of notCanceledFlights) {
            cf = cf.split(' ');
            let tempObj = { 
                Destination: cf[1], 
                Status: 'Ready to fly'
            };
            result.push(tempObj);
        }
    }

    result.forEach((y) => console.log(y))
}