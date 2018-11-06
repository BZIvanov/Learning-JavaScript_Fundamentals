function tickets(arr, target) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    for(let i = 0; i < arr.length; i++) {
        let [town, price, status] = arr[i].split("|");
        arr[i] = new Ticket(town, +price, status)
    }

    arr.sort((a, b) => {
        return a[target] > b[target];
    });
    return arr;
}

console.log(tickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination'
));