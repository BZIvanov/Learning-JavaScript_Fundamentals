function isPrime(num) {
    let prime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
            prime = false;
            break;
        }
    }
    //return prime && (num > 1);
    console.log(prime && (num > 1));
}

isPrime(7);