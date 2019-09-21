function argumentInfo() {
    let dataTypes = new Map();
    for (let arg of arguments) {
        let type = typeof arg;

        if (!dataTypes.has(type)) {
            dataTypes.set(type, 0)
        }
        dataTypes.set(type, dataTypes.get(type) + 1);
        
        console.log(`${type}: ${arg}`);
    }
    let sortedKeys = Array.from(dataTypes.keys()).sort((a, b) => {
        return dataTypes.get(b) - dataTypes.get(a);
    });
    for (let key of sortedKeys) {
        console.log(`${key} = ${dataTypes.get(key)}`);
    }
}
argumentInfo('cat', 42, 15, function () { console.log('Hello world!'); });
argumentInfo({ name: 'bob'}, 3.333, 9.999);
