function compoundInterest(input) {
    [p, i, n, t] = [input[0], input[1], input[2], input[3]];
    i /= 100;
    n  = 12 / n;

    let f = p * Math.pow(1 + i / n, n * t);
    console.log(f.toFixed(2));
}

compoundInterest([1500, 4.3, 3, 6]);