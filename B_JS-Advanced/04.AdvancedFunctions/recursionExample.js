// we can use recursive function to get all the properties from an object for example, even if we don't know how deep nested they will be

const recursionTree = {
  name: 'John',
  children: [
    {
      name: 'Jim',
      children: [],
    },
    {
      name: 'Zoe',
      children: [
        { name: 'Kyle', children: [] },
        { name: 'Sophia', children: [] },
      ],
    },
  ],
};

function printChildrenRecursive(t) {
  if (t.children.length === 0) {
    return;
  }
  t.children.forEach((child) => {
    console.log(child.name);
    printChildrenRecursive(child);
  });
}

printChildrenRecursive(recursionTree);
