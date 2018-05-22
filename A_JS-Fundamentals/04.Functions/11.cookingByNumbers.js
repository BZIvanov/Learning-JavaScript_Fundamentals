function cookingByNumbers(arr) {
    let n = Number(arr.shift())
    let ops = arr.length

    for(let i = 0; i < ops; i++) {
        switch(arr[i]) {
            case "chop": n /= 2; console.log(n); break;
            case "dice": n = Math.sqrt(n); console.log(n); break;
            case "spice": n += 1; console.log(n); break;
            case "bake": n *= 3; console.log(n); break;
            case "fillet": n *= 0.8; console.log(n); break;
            default: console.log("error"); break;
        }
    }
}

cookingByNumbers([9, "dice", "spice", "chop", "bake", "fillet"])