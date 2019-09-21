let manager = (function () {
    let recipes = new Map();
    recipes.set('apple', {protein: 0, carbohydrate: 1, fat: 0, flavour: 2});
    recipes.set('coke', {protein: 0, carbohydrate: 10, fat: 0, flavour: 20});
    recipes.set('burger', {protein: 0, carbohydrate: 5, fat: 7, flavour: 3});
    recipes.set('omelet', {protein: 5, carbohydrate: 0, fat: 1, flavour: 1});
    recipes.set('cheverme', {protein: 10, carbohydrate: 10, fat: 10, flavour: 10});

    let store = {protein: 0, carbohydrate: 0, fat: 0, flavour: 0};

    function restock([element, quantity]){
        store[element] += Number(quantity);
        return 'Success';
    }

    function prepare([recipe, quantity]){
        quantity = Number(quantity);
        let totalRequredProteins = recipes.get(recipe).protein * quantity;
        let totalRequredCarbohydrates = recipes.get(recipe).carbohydrate * quantity;
        let totalRequredFats = recipes.get(recipe).fat * quantity;
        let totalRequredFlavours = recipes.get(recipe).flavour * quantity;

        if (totalRequredProteins > store.protein) return 'Error: not enough protein in stock';
        if (totalRequredCarbohydrates > store.carbohydrate) return 'Error: not enough carbohydrate in stock';
        if (totalRequredFats > store.fat) return 'Error: not enough fat in stock';
        if (totalRequredFlavours > store.flavour) return 'Error: not enough flavour in stock';

        // There are enough ingredients
        store.protein -= totalRequredProteins;
        store.carbohydrate -= totalRequredCarbohydrates;
        store.fat -= totalRequredFats;
        store.flavour -= totalRequredFlavours;

        return 'Success';
    }

    function report() {
        return `protein=${store.protein} carbohydrate=${store.carbohydrate} fat=${store.fat} flavour=${store.flavour}`;
    }

    return function (inputLine) {
        let tokens = inputLine.split(' ');
        let command = tokens[0];
        let cmdArgs = tokens.slice(1);

        switch (command) {
            case 'restock': return restock(cmdArgs);
            case 'prepare': return prepare(cmdArgs);
            case 'report': return report();
        }
    }
})();

console.log(manager('restock protein 100'));
console.log(manager('restock carbohydrate 100'));
console.log(manager('restock fat 100'));
console.log(manager('restock flavour 100'));
console.log(manager('report'));
console.log(manager('prepare omelet 2'));
console.log(manager('report'));
console.log(manager('prepare omelet 1'));
console.log(manager('report'));
