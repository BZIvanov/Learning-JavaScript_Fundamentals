// 01. Towns to JSON
function townsToJSON(arr) {
  const result = [];
  const headers = arr
    .shift()
    .split('|')
    .filter((x) => x !== '')
    .map((x) => x.trim());
  for (let row of arr) {
    row = row
      .split('|')
      .filter((x) => x !== '')
      .map((x) => x.trim());
    const data = {};
    data[headers[0]] = row[0];
    data[headers[1]] = Number(row[1]);
    data[headers[2]] = Number(row[2]);
    result.push(data);
  }
  console.log(JSON.stringify(result));
}
townsToJSON([
  '| Town | Latitude | Longitude |',
  '| Sofia | 42.696552 | 23.32601 |',
  '| Beijing | 39.913818 | 116.363625 |',
]);

// 02. From JSON to HTML
function scoreToHTML(data) {
  data = JSON.parse(data);
  let html = '<table>\n';
  html += '   <tr>';
  for (const key in data[0]) {
    html += `<th>${htmlEscape(key)}</th>`;
  }
  html += '</tr>\n';

  for (const d of data) {
    html += '   <tr>';
    for (const key in d) {
      html += `<td>${htmlEscape(d[key])}</td>`;
    }
    html += '</tr>\n';
  }
  html += '</table>';

  function htmlEscape(text) {
    text = new String(text);
    const symbols = {
      '"': '&quot;',
      '&': '&amp;',
      "'": '&#39;',
      '<': '&lt;',
      '>': '&gt;',
    };
    return text.replace(/[\"&'<>]/g, (ch) => symbols[ch]);
  }

  return html;
}
console.log(
  scoreToHTML(
    '[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"}, {"Name":"Gosho","Age":18,"City":"Plovdiv"}, {"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]'
  )
);

// 03. Sum by town
function sumByTown(arr) {
  const result = {};

  for (let i = 0; i < arr.length; i += 2) {
    if (result.hasOwnProperty(arr[i])) {
      // the plus sign will parse to Number the value
      result[arr[i]] += +arr[i + 1];
    } else {
      result[arr[i]] = +arr[i + 1];
    }
  }
  console.log(JSON.stringify(result));
}
sumByTown(['Sofia', 20, 'Varna', 3, 'Sofia', 5, 'Varna', 4]);

// 05. Count words with map
function countWordsWithMap(input) {
  const myMap = new Map();
  input
    .join(' ')
    .toLowerCase()
    .split(/[^\w]+/)
    .filter((x) => x !== '')
    .forEach((word) => {
      if (!myMap.has(word)) {
        myMap.set(word, 0);
      }
      myMap.set(word, myMap.get(word) + 1);
    });

  const sortedKeys = Array.from(myMap.keys()).sort();

  // values in the sortedKeys are the keys from myMap
  for (const value of sortedKeys) {
    console.log(`'${value}' -> ${myMap.get(value)} times`);
  }
}
countWordsWithMap(["Far too slow, you're far too slow.", 'hello']);

// 07. City markets
function cityMarkets(arr) {
  const myMap = new Map();
  for (const row of arr) {
    const [town, product, quanity, price] = row.split(/ -> | : /g);
    if (!myMap.has(town)) {
      myMap.set(town, new Map());
    }
    myMap.get(town).set(product, Number(quanity) * Number(price));
  }

  for (const [key, value] of myMap) {
    console.log(`Town - ${key}`);
    for (const [k, v] of value) {
      console.log(`$$$${k} : ${v}`);
    }
  }
}
cityMarkets([
  'Sofia -> Laptops HP -> 200 : 2000',
  'Sofia -> Raspberry -> 200000 : 1500',
  'Sofia -> Audi Q7 -> 200 : 100000',
  'Montana -> Portokals -> 200000 : 1',
  'Montana -> Qgodas -> 20000 : 0.2',
  'Montana -> Chereshas -> 1000 : 0.3',
]);

// 08. Lowest prices cities
function findLowestPricedProducts(input) {
  const products = new Map();
  for (const priceList of input) {
    const [town, product, price] = priceList.split(/\s+\|\s+/g);
    if (!products.has(product)) {
      products.set(product, new Map());
    }
    products.get(product).set(town, Number(price));
  }

  for (const [product, towns] of products) {
    let minPrice = Number.MAX_VALUE;
    let minPriceTown = '';
    for (const [town, price] of towns) {
      if (price < minPrice) {
        minPrice = price;
        minPriceTown = town;
      }
    }
    console.log(`${product} -> ${minPrice} (${minPriceTown})`);
  }
}
findLowestPricedProducts([
  'Sample Town | Sample Product | 1000',
  'Sample Town | Orange | 2',
  'Sample Town | Peach | 1',
  'Sofia | Orange | 3',
  'Sofia | Peach | 2',
  'New York | Sample Product | 1000.1',
  'New York | Burger | 10',
]);

// 09. Extract unique words
function extractWords(inputSentences) {
  const wordPattern = /\b\w+\b/g;
  const words = new Set();
  for (const sentence of inputSentences) {
    const matches = sentence.match(wordPattern);
    matches.forEach((x) => words.add(x.toLowerCase()));
  }
  console.log([...words.values()].join(', '));
}
extractWords([
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.',
  'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
  'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
  'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
  'Morbi in ipsum varius, pharetra diam vel, mattis arcu.',
  'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
  'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.',
]);

// 10. Heroic inventory
function heroicInventory(arr) {
  const result = [];
  for (const row of arr) {
    let [name, level, items] = row.split(/\s*\/\s*/);
    level = Number(level);
    items ? (items = items.split(/\W+/g)) : (items = []);
    result.push({ name, level, items });
  }
  console.log(JSON.stringify(result));
}
heroicInventory([
  'Isacc / 25 / Apple',
  'Derek / 12 / BarrelVest, DestructionSword',
  'Hes / 1 ',
]);

// 11. JSON table
function JSONTable(arr) {
  let result = '<table>\n';
  for (let row of arr) {
    row = JSON.parse(row);
    result += '\t<tr>\n';
    for (const key in row) {
      result += `\t\t<td>${htmlEscape(row[key])}</td>\n`;
    }
    result += '\t<tr>\n';
  }
  result += '</table>';

  function htmlEscape(str) {
    str = new String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  console.log(result);
}
JSONTable([
  '{"name":"Pesho","position":"Promenliva","salary":100000}',
  '{"name":"Teo","position":"Lecturer","salary":1000}',
  '{"name":"Georgi","position":"Lecturer","salary":1000}',
]);

// 12. Cappy juice
function cappyJuice(input) {
  const juices = new Map();
  const bottles = new Map();
  for (const row of input) {
    let [fruit, quantity] = row.split(' => ');
    quantity = Number(quantity);

    if (!juices.has(fruit)) {
      juices.set(fruit, 0);
    }
    juices.set(fruit, juices.get(fruit) + quantity);

    if (juices.get(fruit) >= 1000) {
      bottles.set(fruit, Math.floor(juices.get(fruit) / 1000));
    }
  }
  for (const [key, val] of bottles) {
    console.log(`${key} => ${val}`);
  }
}
cappyJuice([
  'Orange => 2000',
  'Peach => 1432',
  'Banana => 450',
  'Peach => 600',
  'Strawberry => 549',
]);

// 13. Store catalogue
function storeCatalogue(arr) {
  const store = new Map();
  for (const row of arr) {
    const [product, price] = row.split(' : ');
    const letter = product[0];
    if (!store.has(letter)) {
      store.set(letter, new Map());
    }
    store.get(letter).set(product, price);
  }

  function alphaSort(a, b) {
    return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
  }

  const sortedLetters = Array.from(store).sort(alphaSort);
  for (const [key, value] of sortedLetters) {
    console.log(key);
    const sortedProducts = Array.from(value).sort(alphaSort);
    for (const [k, v] of sortedProducts) {
      console.log(`  ${k}: ${v}`);
    }
  }
}
storeCatalogue([
  'Appricot : 20.4',
  'Fridge : 1500',
  'TV : 1499',
  'Deodorant : 10',
  'Boiler : 300',
  'Apple : 1.25',
  'Anti-Bug Spray : 15',
  'T-Shirt : 10',
]);

// 14. Auto engineering company
function generateCarLog(data) {
  const catalogue = new Map();
  for (const line of data) {
    const [brand, model, quantity] = line.split(/\s\|\s/);
    if (!catalogue.has(brand)) {
      catalogue.set(brand, new Map());
    }

    if (!catalogue.get(brand).has(model)) {
      catalogue.get(brand).set(model, 0);
    }
    catalogue
      .get(brand)
      .set(model, catalogue.get(brand).get(model) + Number(quantity));
  }

  for (const [brand, models] of catalogue) {
    console.log(brand);
    for (const [model, quantity] of models) {
      console.log(`###${model} -> ${quantity}`);
    }
  }
}
generateCarLog([
  'Audi | Q7 | 1000',
  'Audi | Q6 | 100',
  'BMW | X5 | 1000',
  'BMW | X6 | 100',
  'Citroen | C4 | 123',
  'Volga | GAZ-24 | 1000000',
  'Lada | Niva | 1000000',
  'Lada | Jigula | 1000000',
  'Citroen | C4 | 22',
  'Citroen | C5 | 10',
]);

// 15. System components
function systemComponents(input) {
  const systems = new Map();
  input.forEach((row) => {
    const [system, component, subcomponent] = row.split(' | ');
    if (!systems.has(system)) systems.set(system, {});
    if (!systems.get(system).hasOwnProperty(component))
      systems.get(system)[component] = [];
    systems.get(system)[component].push(subcomponent);
  });
  const systemsSortedKeys = [...systems.keys()].sort(
    amountOfComponentsThenAlpabeticalSort
  );
  systemsSortedKeys.forEach((systemName) => {
    console.log(systemName);
    const system = systems.get(systemName);
    const componentsSortedKeys = Object.keys(system).sort((a, b) => {
      return system[a].length < system[b].length;
    });
    componentsSortedKeys.forEach((component) => {
      console.log(`|||${component}`);
      system[component].forEach((subcomponent) => {
        console.log(`||||||${subcomponent}`);
      });
    });
  });

  function amountOfComponentsThenAlpabeticalSort(a, b) {
    if (
      Object.keys(systems.get(a)).length === Object.keys(systems.get(b)).length
    ) {
      if (a > b) return 1;
      if (a < b) return -1;
    } else
      return (
        Object.keys(systems.get(a)).length < Object.keys(systems.get(b)).length
      );
  }
}
systemComponents([
  'SULS | Main Site | Home Page',
  'SULS | Main Site | Login Page',
  'SULS | Main Site | Register Page',
  'SULS | Judge Site | Login Page',
  'SULS | Judge Site | Submittion Page',
  'Lambda | CoreA | A23',
  'SULS | Digital Site | Login Page',
  'Lambda | CoreB | B24',
  'Lambda | CoreA | A24',
  'Lambda | CoreA | A25',
  'Lambda | CoreC | C4',
  'Indice | Session | Default Storage',
  'Indice | Session | Default Security',
]);

// 16. Usernames
function usernames(input) {
  const usernames = new Set();
  for (const name of input) {
    usernames.add(name);
  }
  function nameCompare(a, b) {
    return a.length - b.length || a.localeCompare(b);
  }
  console.log([...usernames].sort(nameCompare).join('\n'));
}
usernames([
  'Ashton',
  'Kutcher',
  'Ariel',
  'Lilly',
  'Keyden',
  'Aizen',
  'Billy',
  'Braston',
]);

// 17. Unique sequence
function uniqueSequences(data) {
  const customSort = (arrA, arrB, map) => map.get(arrA) - map.get(arrB);
  const arrays = new Map();
  for (const line of data) {
    const array = JSON.parse(line)
      .map(Number)
      .sort((a, b) => b - a);
    const toStore = `[${array.join(', ')}]`;
    if (!arrays.has(toStore)) {
      arrays.set(toStore, array.length);
    }
  }
  console.log(
    [...arrays.keys()].sort((a, b) => customSort(a, b, arrays)).join('\n')
  );
}
uniqueSequences([
  '[-3, -2, -1, 0, 1, 2, 3, 4]',
  '[10, 1, -17, 0, 2, 13]',
  '[4, -3, 3, -2, 2, -1, 1, 0]',
]);
uniqueSequences([
  '[7.14, 7.180, 7.339, 80.099]',
  '[7.339, 80.0990, 7.140000, 7.18]',
  '[7.339, 7.180, 7.14, 80.099]',
]);

// 18. Arena tier
function arenaTier(arr) {
  const gladiators = {};

  for (const row of arr) {
    if (row.indexOf(' -> ') > -1) {
      const [glad, skill, level] = row.split(' -> ');
      if (!gladiators.hasOwnProperty(glad)) {
        gladiators[glad] = { ___total___: 0 };
      }
      if (!gladiators[glad].hasOwnProperty(skill)) {
        gladiators[glad][skill] = 0;
      }
      if (gladiators[glad][skill] < +level) {
        const previousValue = gladiators[glad][skill];
        gladiators[glad][skill] = +level;
        gladiators[glad]['___total___'] += +level - previousValue;
      }
    } else if (row.indexOf(' vs ') > -1) {
      const [first, second] = row.split(' vs ');
      if (
        gladiators.hasOwnProperty(first) &&
        gladiators.hasOwnProperty(second)
      ) {
        const firstSkills = Object.keys(gladiators[first]).filter(
          (x) => x !== '___total___'
        );
        const secondSkills = Object.keys(gladiators[second]).filter(
          (x) => x !== '___total___'
        );
        let haveSkillInCommon = false;
        for (let s of firstSkills) {
          if (secondSkills.includes(s)) {
            haveSkillInCommon = true;
          }
        }

        if (haveSkillInCommon) {
          if (
            gladiators[first]['___total___'] > gladiators[second]['___total___']
          ) {
            delete gladiators[second];
          } else {
            delete gladiators[first];
          }
        }
      }
    } else {
      const sortedKeys = Object.keys(gladiators).sort((a, b) => {
        return (
          gladiators[b]['___total___'] - gladiators[a]['___total___'] ||
          a.localeCompare(b)
        );
      });
      for (const key of sortedKeys) {
        console.log(`${key}: ${gladiators[key]['___total___']} skill`);
        const sortedInnerKeys = Object.keys(gladiators[key])
          .filter((x) => x !== '___total___')
          .sort((a, b) => {
            return (
              gladiators[key][b] - gladiators[key][a] || a.localeCompare(b)
            );
          });
        for (const innerKey of sortedInnerKeys) {
          console.log(`- ${innerKey} <!> ${gladiators[key][innerKey]}`);
        }
      }
      break;
    }
  }
}
arenaTier([
  'Pesho -> BattleCry -> 400',
  'Gosho -> PowerPunch -> 300',
  'Stamat -> Duck -> 200',
  'Stamat -> Tiger -> 250',
  'Ave Cesar',
]);
arenaTier([
  'Pesho -> Duck -> 400',
  'Julius -> Shield -> 150',
  'Gladius -> Heal -> 200',
  'Gladius -> Support -> 250',
  'Gladius -> Shield -> 250',
  'Pesho vs Gladius',
  'Gladius vs Julius',
  'Gladius vs Gosho',
  'Ave Cesar',
]);

// 19. Game of epicness
function gameOfEpicness(objects, arr) {
  const kingdoms = {};
  //arrange kingdoms
  for (let obj of objects) {
    const kd = obj['kingdom'];
    const gr = obj['general'];
    const am = obj['army'];
    if (!kingdoms.hasOwnProperty(kd)) {
      kingdoms[kd] = { ___totalWins___: 0, ___totalLosses___: 0 };
    }
    if (!kingdoms[kd].hasOwnProperty(gr)) {
      kingdoms[kd][gr] = { wins: 0, losses: 0, army: 0 };
    }
    kingdoms[kd][gr]['army'] += +am;
  }

  //arrange fights
  for (const row of arr) {
    if (row[0] === row[2]) {
      continue;
    }
    if (!kingdoms[row[0]] || !kingdoms[row[2]]) {
      continue;
    }
    if (
      kingdoms[row[0]].hasOwnProperty(row[1]) &&
      kingdoms[row[2]].hasOwnProperty(row[3])
    ) {
      const attackingArmy = kingdoms[row[0]][row[1]]['army'];
      const defendingArmy = kingdoms[row[2]][row[3]]['army'];
      if (attackingArmy > defendingArmy) {
        kingdoms[row[0]][row[1]]['army'] = Math.floor(
          kingdoms[row[0]][row[1]]['army'] * 1.1
        );
        kingdoms[row[2]][row[3]]['army'] = Math.floor(
          kingdoms[row[2]][row[3]]['army'] * 0.9
        );
        kingdoms[row[0]][row[1]]['wins']++;
        kingdoms[row[2]][row[3]]['losses']++;
        kingdoms[row[0]]['___totalWins___']++;
        kingdoms[row[2]]['___totalLosses___']++;
      } else if (attackingArmy < defendingArmy) {
        kingdoms[row[0]][row[1]]['army'] = Math.floor(
          kingdoms[row[0]][row[1]]['army'] * 0.9
        );
        kingdoms[row[2]][row[3]]['army'] = Math.floor(
          kingdoms[row[2]][row[3]]['army'] * 1.1
        );
        kingdoms[row[0]][row[1]]['losses']++;
        kingdoms[row[2]][row[3]]['wins']++;
        kingdoms[row[0]]['___totalLosses___']++;
        kingdoms[row[2]]['___totalWins___']++;
      }
    }
  }

  //print results
  const winner = Object.keys(kingdoms).sort((a, b) => {
    return (
      kingdoms[b]['___totalWins___'] - kingdoms[a]['___totalWins___'] ||
      kingdoms[a]['___totalLosses___'] - kingdoms[b]['___totalLosses___'] ||
      a.localeCompare(b)
    );
  })[0];
  console.log(`Winner: ${winner}`);
  const sortedGenerals = Object.keys(kingdoms[winner])
    .filter((x) => x !== '___totalWins___' && x !== '___totalLosses___')
    .sort((a, b) => {
      return kingdoms[winner][b]['army'] - kingdoms[winner][a]['army'];
    });
  for (const gen of sortedGenerals) {
    console.log(`/\\general: ${gen}`);
    console.log(`---army: ${kingdoms[winner][gen]['army']}`);
    console.log(`---wins: ${kingdoms[winner][gen]['wins']}`);
    console.log(`---losses: ${kingdoms[winner][gen]['losses']}`);
  }
}
gameOfEpicness(
  [
    { kingdom: 'Maiden Way', general: 'Merek', army: 5000 },
    { kingdom: 'Stonegate', general: 'Ulric', army: 4900 },
    { kingdom: 'Stonegate', general: 'Doran', army: 70000 },
    { kingdom: 'YorkenShire', general: 'Quinn', army: 0 },
    { kingdom: 'YorkenShire', general: 'Quinn', army: 2000 },
    { kingdom: 'Maiden Way', general: 'Berinon', army: 100000 },
  ],
  [
    ['YorkenShire', 'Quinn', 'Stonegate', 'Ulric'],
    ['Stonegate', 'Ulric', 'Stonegate', 'Doran'],
    ['Stonegate', 'Doran', 'Maiden Way', 'Merek'],
    ['Stonegate', 'Ulric', 'Maiden Way', 'Merek'],
    ['Maiden Way', 'Berinon', 'Stonegate', 'Ulric'],
  ]
);

// 20. Followers
function followers(arr) {
  let totalUsers = 0;
  const people = {};

  for (const row of arr) {
    if (row.indexOf('Welcome, ') > -1) {
      registerUser(row);
    } else {
      followUser(row);
    }
  }

  function registerUser(item) {
    const newUser = item.split(' ').filter((x) => x !== '')[1];
    if (!people.hasOwnProperty(newUser)) {
      people[newUser] = { following: 0, followers: 0, list: [] };
      totalUsers++;
    }
  }

  function followUser(item) {
    const [f1, f2] = item.split(' followed ');
    if (f1 === f2) {
      return;
    }
    const p1 = people.hasOwnProperty(f1);
    const p2 = people.hasOwnProperty(f2);
    if (p1 === false || p2 === false) {
      return;
    }
    if (people[f2]['list'].includes(f1)) {
      return;
    }

    people[f2]['followers']++;
    people[f2]['list'].push(f1);
    people[f1]['following']++;
  }

  //print the results
  console.log(`Total users registered: ${totalUsers}`);
  const sortedUsers = Object.keys(people).sort((a, b) => {
    return (
      people[b]['followers'] - people[a]['followers'] ||
      b.localeCompare(a) ||
      people[a]['following'] - people[b]['following']
    );
  });

  let order = 0;
  for (const user of sortedUsers) {
    order++;
    if (order === 1) {
      console.log(
        `1. ${user} : ${people[user]['following']} following, ${people[user]['followers']} followers`
      );
      const sortedList = people[user]['list'].sort();
      for (const name of sortedList) {
        console.log(`*  ${name}`);
      }
    } else {
      console.log(
        `${order}. ${user} : ${people[user]['following']} following, ${people[user]['followers']} followers`
      );
    }
  }
}
followers([
  'Welcome, JennaMarbles',
  'JennaMarbles followed Zoella',
  'Welcome, AmazingPhil',
  'JennaMarbles followed AmazingPhil',
  'Welcome, Zoella',
  'Welcome, JennaMarbles',
  'Zoella followed AmazingPhil',
  'Christy followed Zoella',
  'Zoella followed Christy',
  'Welcome, JacksGap',
  'JacksGap followed JennaMarbles',
  'Welcome, PewDiePie',
  'Welcome, Zoella',
]);

// 21. Travellers log
function travlellersLog(arr) {
  const people = {};

  for (const row of arr) {
    if (row.indexOf('visited') === -1) {
      addIncome(row);
    } else {
      visitLandmark(row);
    }
  }

  function addIncome(r) {
    const [name, income] = r.split(' gets ');
    if (!people.hasOwnProperty(name)) {
      people[name] = { money: 0 };
    }
    people[name]['money'] += +income;
  }

  function visitLandmark(r) {
    const [name, leftA] = r.split(' visited the ');
    const [landmark, leftB] = leftA.split(' in ');
    const [country, price] = leftB.split(' - ');

    if (!people.hasOwnProperty(name)) {
      people[name] = {};
      people[name]['money'] = 0;
      console.log(`Not enough money to visit ${landmark}`);
      return;
    }
    if (people[name][country] && people[name][country].includes(landmark)) {
      return;
    }
    if (people[name]['money'] < +price) {
      console.log(`Not enough money to visit ${landmark}`);
      return;
    }
    if (!people[name].hasOwnProperty(country)) {
      people[name][country] = [];
    }
    people[name][country] = people[name][country].filter((x) => x !== landmark);
    people[name][country].push(landmark);
    people[name]['money'] -= +price;
  }

  //print the results
  const sortedPeople = Object.keys(people).sort((a, b) => {
    const c1 = Object.keys(people[a]).length;
    const c2 = Object.keys(people[b]).length;
    return c2 - c1;
  });

  for (const person of sortedPeople) {
    console.log(
      `${person} visited ${
        Object.keys(people[person]).length - 1
      } countries and has ${people[person]['money']} money left`
    );
    const sortedCountries = Object.keys(people[person])
      .filter((x) => x !== 'money')
      .sort((a, b) => {
        let m1 = people[person][a].length;
        let m2 = people[person][b].length;
        return m2 - m1;
      });
    for (const sc of sortedCountries) {
      console.log(`- ${sc} -> ${people[person][sc].length} landmarks`);
      people[person][sc] = people[person][sc].sort();
      for (let lm of people[person][sc]) {
        console.log(`-- ${lm}`);
      }
    }
  }
}
travlellersLog([
  'Peter gets 100',
  'Peter visited the StatueOfLiberty in USA - 50',
  'Bill gets 250',
  'Tim visited the ChristTheRedeemer in Brazil - 150',
  'Bill gets 400',
  'Bill visited the MountFuji in Japan - 600',
  'Bill visited the TeatroAmazonas in Brazil - 50',
  'Bill gets 150',
  'Bill visited the ChristTheRedeemer in Brazil - 150',
  'Tim gets 500',
  'Bill visited the StatueOfLiberty in USA - 440',
  'Tim visited the StatueOfLiberty in USA - 440',
  'Maria gets 650',
  'Maria visited the StatueOfLiberty in USA - 440',
  'Maria visited the CapeCod in USA - 100',
]);

// 22. School grades
function schoolGrades(arr) {
  const school = {};

  for (const row of arr) {
    const tokens = row.split(', ');
    const name = tokens[0].substring(14);
    const grade = tokens[1].substring(7);
    const score = +tokens[2].substring(33);
    if (score < 3) {
      continue;
    }
    if (!school.hasOwnProperty(grade)) {
      school[grade] = { list: [], AVG: [] };
    }
    school[grade]['list'].push(name);
    school[grade]['AVG'].push(score);
  }
  const sortedGrades = Object.keys(school).sort((a, b) => {
    return +a - +b;
  });
  for (const sg of sortedGrades) {
    const n = +sg + 1;
    const averageGRade =
      school[sg]['AVG'].reduce((acc, cur) => {
        return acc + cur;
      }, 0) / school[sg]['AVG'].length;
    console.log(`${n} Grade`);
    console.log(`List of students: ${school[sg]['list'].join(', ')}`);
    console.log(
      `Average annual grade from last year: ${averageGRade.toFixed(2)}`
    );
    console.log();
  }
}
schoolGrades([
  'Student name: Mark, Grade: 8, Graduated with an average score: 4.75',
  'Student name: Ethan, Grade: 9, Graduated with an average score: 5.66',
  'Student name: George, Grade: 8, Graduated with an average score: 2.83',
  'Student name: Steven, Grade: 10, Graduated with an average score: 4.20',
  'Student name: Joey, Grade: 9, Graduated with an average score: 4.90',
  'Student name: Angus, Grade: 11, Graduated with an average score: 2.90',
  'Student name: Bob, Grade: 11, Graduated with an average score: 5.15',
  'Student name: Daryl, Grade: 8, Graduated with an average score: 5.95',
  'Student name: Bill, Grade: 9, Graduated with an average score: 6.00',
  'Student name: Philip, Grade: 10, Graduated with an average score: 5.05',
  'Student name: Peter, Grade: 11, Graduated with an average score: 4.88',
  'Student name: Gavin, Grade: 10, Graduated with an average score: 4.00',
]);

// 23. Browser logger
function broswerHistory(obj, actions) {
  for (const action of actions) {
    const [act, website] = action.split(' ');
    if (act === 'Open') {
      openTab(website);
    } else if (act === 'Close') {
      closeTab(website);
    } else {
      obj['Open Tabs'] = [];
      obj['Recently Closed'] = [];
      obj['Browser Logs'] = [];
    }
  }

  function openTab(w) {
    obj['Open Tabs'].push(w);
    actionLogs(w, 'Open ');
  }

  function closeTab(w) {
    if (obj['Open Tabs'].includes(w)) {
      const index = obj['Open Tabs'].indexOf(w);
      const closedItem = obj['Open Tabs'].splice(index, 1)[0];
      obj['Recently Closed'].push(closedItem);
      actionLogs(w, 'Close ');
    }
  }

  function actionLogs(w, pre) {
    obj['Browser Logs'].push(pre + w);
  }

  console.log(obj['Browser Name']);
  console.log(`Open Tabs: ${obj['Open Tabs'].join(', ')}`);
  console.log(`Recently Closed: ${obj['Recently Closed'].join(', ')}`);
  console.log(`Browser Logs: ${obj['Browser Logs'].join(', ')}`);
}

// 24. Catalogue
function catalogue(arr) {
  const list = {};
  for (const row of arr) {
    const [item, price] = row.split(' : ');
    const capLetter = item[0].toUpperCase();
    if (!list.hasOwnProperty(capLetter)) {
      list[capLetter] = {};
    }
    list[capLetter][item] = +price;
  }

  const sortedKeys = Object.keys(list).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  for (const key of sortedKeys) {
    console.log(key);
    const sortedInnerKeys = Object.keys(list[key]).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
    for (const innerKey of sortedInnerKeys) {
      console.log(`  ${innerKey}: ${list[key][innerKey]}`);
    }
  }
}
catalogue([
  'Appricot : 20.4',
  'Fridge : 1500',
  'TV : 1499',
  'Deodorant : 10',
  'Boiler : 300',
  'Apple : 1.25',
  'Anti-Bug Spray : 15',
  'T-Shirt : 10',
]);

// 25. Flight schedule
function flightSchedule(arr) {
  const flights = arr[0];
  const actions = arr[1];
  const act = arr[2][0];
  const result = [];

  const affected = actions.map((x) => (x = x.split(' ')[0]));

  if (act === 'Cancelled') {
    const canceledFlights = flights.filter((x) => {
      for (const af of affected) {
        if (x.indexOf(af) > -1) {
          return true;
        }
      }
      return false;
    });
    for (let cf of canceledFlights) {
      cf = cf.split(' ');
      result.push({
        Destination: cf[1],
        Status: 'Cancelled',
      });
    }
  } else if (act === 'Ready to fly') {
    const notCanceledFlights = flights.filter((x) => {
      for (const af of affected) {
        if (x.indexOf(af) > -1) {
          return false;
        }
      }
      return true;
    });
    for (let cf of notCanceledFlights) {
      cf = cf.split(' ');
      result.push({
        Destination: cf[1],
        Status: 'Ready to fly',
      });
    }
  }
  result.forEach((y) => console.log(y));
}
