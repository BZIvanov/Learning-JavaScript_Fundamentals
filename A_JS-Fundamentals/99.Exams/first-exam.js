// 01. Hungry programmer
function hungryProgrammer(list, commands) {
  let mealsEaten = 0;

  const processor = (function () {
    const Serve = function () {
      if (list.length > 0) {
        const item = list.pop();
        console.log(`${item} served!`);
      }
    };
    const Add = function (meal) {
      if (meal) {
        list.unshift(meal);
      }
    };
    const Shift = function (a, b) {
      if (list.length > 0) {
        a = +a;
        b = +b;
        if (a !== b && a < list.length && a >= 0 && b < list.length && b >= 0) {
          if (a < b) {
            const firstMeal = list.splice(a, 1)[0];
            const secondMeal = list.splice(b - 1, 1)[0];
            list.splice(a, 0, secondMeal);
            list.splice(b, 0, firstMeal);
          } else {
            const firstMeal = list.splice(b, 1)[0];
            const secondMeal = list.splice(a - 1, 1)[0];
            list.splice(b, 0, secondMeal);
            list.splice(a, 0, firstMeal);
          }
        }
      }
    };
    const Eat = function () {
      if (list.length > 0) {
        const item = list.shift();
        console.log(`${item} eaten`);
        mealsEaten++;
      }
    };
    const Consume = function (a, b) {
      const firstIndex = Number(a);
      const secondIndex = Number(b);
      if (list[firstIndex] != undefined && list[secondIndex] != undefined) {
        const count = secondIndex - firstIndex + 1;
        list.splice(firstIndex, count);
        console.log('Burp!');
        mealsEaten += count;
      }
    };
    return { Serve, Add, Shift, Eat, Consume };
  })();

  for (const comm of commands) {
    const [action, first, second] = comm.split(' ');
    if (action === 'End') {
      break;
    }
    processor[action](first, second);
  }

  if (list.length !== 0) {
    console.log(`Meals left: ${list.join(', ')}`);
  } else {
    console.log('The food is gone');
  }
  console.log(`Meals eaten: ${mealsEaten}`);
}

hungryProgrammer(
  ['chicken', 'steak', 'eggs'],
  ['Serve', 'Eat', 'End', 'Consume 0 1']
);

// 02. Expedition
function expedition(main, secondary, mods, startPoint) {
  let modified = main.slice(0);
  let iterations = mods.length;
  for (let i = 0; i < iterations; i++) {
    modified = modifier(modified, secondary, mods[i]);
  }

  function modifier(m, s, p) {
    let topLeftRow = p[0];
    let endRow = Math.min(topLeftRow + s.length, m.length);
    let topLeftCol = p[1];
    let endCol = Math.min(topLeftCol + s[0].length, m[0].length);
    let smallRow = 0;
    let smallCow = 0;
    for (let row = topLeftRow; row < endRow; row++) {
      for (let col = topLeftCol; col < endCol; col++) {
        if (s[smallRow][smallCow] === 1) {
          if (m[row][col] === 1) {
            m[row][col] = 0;
          } else {
            m[row][col] = 1;
          }
        }
        smallCow++;
      }
      smallCow = 0;
      smallRow++;
    }
    return m;
  }

  let startRow = startPoint[0];
  let startCol = startPoint[1];
  let steps = 0;
  while (true) {
    if (steps !== 0) {
      let top = checkTop(startRow, startCol);
      let bottom = checkBottom(startRow, startCol);
      let left = checkLeft(startRow, startCol);
      let right = checkRight(startRow, startCol);

      if (!top && !bottom && !left && !right) {
        if (startRow === 0) {
          console.log(steps);
          console.log('Top');
          break;
        } else if (startRow === modified.length - 1) {
          console.log(steps);
          console.log('Bottom');
          break;
        } else if (startCol === 0) {
          console.log(steps);
          console.log('Left');
          break;
        } else if (startCol === modified[0].length - 1) {
          console.log(steps);
          console.log('Right');
          break;
        } else {
          console.log(steps);

          //find quadrant
          let quadrant = 0;
          let horizontal = modified[0].length / 2 - 1;
          let vertical = modified.length / 2 - 1;
          if (startRow <= vertical && startCol > horizontal) {
            quadrant = 1;
          } else if (startRow > vertical && startCol > horizontal) {
            quadrant = 4;
          } else if (startRow > vertical && startCol <= horizontal) {
            quadrant = 3;
          } else if (startRow <= vertical && startCol <= horizontal) {
            quadrant = 2;
          }
          console.log(`Dead end ${quadrant}`);
          break;
        }
      }

      if (top) {
        modified[startRow][startCol] = 1;
        startRow -= 1;
      } else if (bottom) {
        modified[startRow][startCol] = 1;
        startRow += 1;
      } else if (left) {
        modified[startRow][startCol] = 1;
        startCol -= 1;
      } else if (right) {
        modified[startRow][startCol] = 1;
        startCol += 1;
      }
    }
    steps++;
  }

  function checkTop(a, b) {
    if (modified[a - 1] && modified[a - 1][b] === 0) {
      return true;
    } else {
      return false;
    }
  }
  function checkBottom(a, b) {
    if (modified[a + 1] && modified[a + 1][b] === 0) {
      return true;
    } else {
      return false;
    }
  }
  function checkLeft(a, b) {
    if (modified[a][b - 1] === 0) {
      return true;
    } else {
      return false;
    }
  }
  function checkRight(a, b) {
    if (modified[a][b + 1] === 0) {
      return true;
    } else {
      return false;
    }
  }
}
expedition(
  [
    [1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [1, 1],
    [2, 3],
    [5, 3],
  ],
  [0, 2]
);

// 03. Lost
function lost(keyword, text) {
  let pattern = /(north|east)\D*(\d{2})[^,]*(,)\D*(\d{6})/gi;
  let messagePattern = new RegExp(`(${keyword})(.*)(${keyword})`, 'g');
  let message = messagePattern.exec(text)[2];

  let latOutput = '';
  let longOutput = '';
  let match = pattern.exec(text);
  while (match) {
    if (match[1].toLowerCase() === 'north') {
      latOutput = `${match[2]}.${match[4]} N`;
    } else {
      longOutput = `${match[2]}.${match[4]} E`;
    }
    match = pattern.exec(text);
  }
  console.log(latOutput);
  console.log(longOutput);
  console.log(`Message: ${message}`);
}
lost([
  '<>',
  'o u%&lu43t&^ftgv><nortH4276hrv756dcc,  jytbu64574655k <>ThE sanDwich is iN the refrIGErator<>yl i75evEAsTer23,lfwe 987324tlblu6b',
]);

// 04. Rest house
function restHouse(availableRooms, guests) {
  let rooms = new Map();
  let guestsWithoutRooms = 0;
  for (let currentRoom of availableRooms) {
    let roomSpace = currentRoom.type === 'double-bedded' ? 2 : 3;
    rooms.set(currentRoom.number, {
      type: currentRoom.type,
      emptyBeds: roomSpace,
    });
  }
  for (let currentPair of guests) {
    let roomFound = false;
    if (currentPair.first.gender != currentPair.second.gender) {
      for (let [key, value] of rooms) {
        if (value.type == 'double-bedded' && value.emptyBeds == 2) {
          value.guests = [];
          value.guests = [currentPair.first, currentPair.second];
          value.emptyBeds = 0;
          roomFound = true;
          break;
        }
      }
    } else {
      for (let [key, value] of rooms) {
        if (value.type == 'triple' && value.emptyBeds > 1) {
          if (value.guests == undefined) {
            value.guests = [];
          } else if (value.guests[0].gender != currentPair.second.gender) {
            continue;
          }
          if (currentPair.first != undefined) {
            value.guests.push(currentPair.first);
            value.emptyBeds -= 1;
          }
          value.guests.push(currentPair.second);
          value.emptyBeds -= 1;
          roomFound = true;
          break;
        } else if (value.type == 'triple' && value.emptyBeds == 1) {
          if (value.guests[0].gender == currentPair.second.gender) {
            value.guests.push(
              currentPair.first == undefined
                ? currentPair.second
                : currentPair.first
            );
            value.emptyBeds -= 1;
            currentPair.first = undefined;
          }
        }
      }
    }
    if (!roomFound) {
      guestsWithoutRooms += currentPair.first == undefined ? 1 : 2;
    }
  }
  for (let [room, value] of [...rooms].sort()) {
    console.log(`Room number: ${room}`);
    if (value.guests != undefined) {
      for (let guest of value.guests.sort(function (a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      })) {
        console.log(`--Guest Name: ${guest.name}`);
        console.log(`--Guest Age: ${guest.age}`);
      }
    }
    console.log(`Empty beds in the room: ${value.emptyBeds}`);
  }
  console.log(`Guests moved to the tea house: ${guestsWithoutRooms}`);
}
restHouse(
  [
    { number: '101A', type: 'double-bedded' },
    { number: '104', type: 'triple' },
    { number: '102', type: 'triple' },
    { number: '202', type: 'triple' },
  ],
  [
    {
      first: { name: 'Sushi & Chicken', gender: 'female', age: 15 },
      second: { name: 'Salisa Debelisa', gender: 'female', age: 25 },
    },
    {
      first: { name: 'Edno', gender: 'female', age: 15 },
      second: { name: 'Dve', gender: 'female', age: 25 },
    },
    {
      first: { name: 'Daenerys Targaryen', gender: 'female', age: 20 },
      second: { name: 'Jeko Snejev', gender: 'male', age: 18 },
    },
    {
      first: { name: 'Pesho Goshov', gender: 'male', age: 20 },
      second: { name: 'Gosho Peshov', gender: 'male', age: 18 },
    },
    {
      first: { name: 'Conor McGregor', gender: 'male', age: 29 },
      second: { name: 'Floyd Mayweather', gender: 'male', age: 40 },
    },
  ]
);
