function gladiatorInventory(arr) {
    let inventory = arr.shift().split(' ');

    let commands = (function() {
        let Buy = function(item) {
            if(!inventory.includes(item)) {
                inventory.push(item);
            }
        }
        let Trash = function(item) {
            let index = inventory.indexOf(item)
            if(index > -1) {
                inventory.splice(index, 1);
            }
        }
        let Repair = function(item) {
            let index = inventory.indexOf(item)
            if(index > -1) {
                let item = inventory.splice(index, 1);
                inventory.push(item[0])
            }
        }
        let Upgrade = function(str) {
            let [item, up] = str.split('-')
            let index = inventory.indexOf(item)
            if(index > -1) {
                let upgraded = item + ':' + up;
                inventory.splice(index + 1, 0, upgraded)
            }
        }
        let Fight = function() {
            console.log(inventory.join(' '))
        }
 
        return { Buy, Trash, Repair, Upgrade, Fight }
    })()

    for(let row of arr) {
        let [com, item] = row.split(' ');
        if(com === 'Fight!') {
            com = com.substring(0, com.length - 1)
        }
        commands[com](item);
    }
}