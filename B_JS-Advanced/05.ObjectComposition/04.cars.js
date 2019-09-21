function cars(input) {
    let factory = (function() {
        let park = new Map();
        
        function create(items) {
            if (items.length === 1) {
                park.set(items[0], {});
                return;
            }
            park.set(items[0], Object.create(park.get(items[2])));
        }
        function set(items) {
            park.get(items[0])[items[1]] = items[2];
        }
        function print(items) {
            let current = park.get(items[0]);
            let props = [];
            for (let key in current) {
                props.push(`${key}:${current[key]}`);
            }
            console.log(props.join(", "));
        }
    
        return { create, set, print };
    })();

    for(let row of input) {
        let tokens = row.split(" ");
        let action = tokens.shift();
        factory[action]([...tokens]);
    }
}
cars(['create c1',
'create c2 inherit c1',
'set c1 color red',
'set c2 model new',
'print c1',
'print c2'
]);
