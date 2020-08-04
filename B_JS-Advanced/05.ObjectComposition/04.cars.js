function cars(input) {
  const factory = (function () {
    const park = new Map();

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
      const current = park.get(items[0]);
      const props = [];
      for (const key in current) {
        props.push(`${key}:${current[key]}`);
      }
      console.log(props.join(', '));
    }

    return { create, set, print };
  })();

  for (const row of input) {
    const tokens = row.split(' ');
    const action = tokens.shift();
    factory[action]([...tokens]);
  }
}
cars([
  'create c1',
  'create c2 inherit c1',
  'set c1 color red',
  'set c2 model new',
  'print c1',
  'print c2',
]);

// color:red
// model:new, color:red
