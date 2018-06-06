function cappyJuice(input) {
    let juices = new Map();
    let bottles = new Map();
    for (let row of input) {
        let [fruit, quantity] = row.split(" => ");
        quantity = Number(quantity);

        if (!juices.has(fruit)) {
            juices.set(fruit, 0);
        }
        juices.set(fruit, juices.get(fruit) + quantity);

        if (juices.get(fruit) >= 1000) {
            bottles.set(fruit, Math.floor(juices.get(fruit) / 1000))
        }
    }
    for (let [key, val] of bottles) {
        console.log(`${key} => ${val}`)
    }
}

cappyJuice(["Orange => 2000",
    "Peach => 1432",
    "Banana => 450",
    "Peach => 600",
    "Strawberry => 549"
])