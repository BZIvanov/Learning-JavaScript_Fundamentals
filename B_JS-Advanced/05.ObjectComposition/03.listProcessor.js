function execListProcessor(commands) {
  const processor = (function () {
    let innerStorage = [];

    function add(item) {
      innerStorage.push(item);
    }
    function remove(item) {
      innerStorage = innerStorage.filter((e) => e != item);
    }
    function print() {
      console.log('' + innerStorage);
    }

    return { add, remove, print };
  })();

  for (const command of commands) {
    const [op, arg] = command.trim().split(/\s+/);
    processor[op](arg);
  }
}

execListProcessor([
  'add hello',
  'add again',
  'remove hello',
  'add again',
  'print',
]); // again,again
