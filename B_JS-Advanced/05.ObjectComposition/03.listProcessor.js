function execListProcessor(commands) {
    let processor = (function () {
        let innerStorage = [];

        function add(item) {
            innerStorage.push(item);
        }
        function remove(item) {
            innerStorage = innerStorage.filter(e => e != item);
        }
        function print() {
            console.log('' + innerStorage);
        }

        return {add, remove, print};
    })();

    for (let command of commands) {
        let [op, arg] = command.trim().split(/\s+/);
        processor[op](arg);
    }
}

execListProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print']);