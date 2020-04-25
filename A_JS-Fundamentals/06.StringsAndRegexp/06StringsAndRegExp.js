// 01. Print letters
function letters(str) {
  Array.from(str).forEach((s, i) => console.log(`str[${i}] -> ${s}`));
}
letters('Hello, World!');

// 02. Concatenate reversed
function concatenateReversed(arr) {
  const result = Array.from(arr.join('')).reverse().join('');
  console.log(result);
}
concatenateReversed(['I', 'am', 'student']);

// 03. Count occurencies
function occurences(item, text) {
  let count = 0;
  let startIndex = text.indexOf(item);
  while (startIndex > 0) {
    count++;
    startIndex = text.indexOf(item, startIndex + 1);
  }
  console.log(count);
}
occurences(
  'ma',
  'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.'
);

// 04. Extract text
function extractText(str) {
  let startIndex = str.indexOf('(');
  let endIndex = str.indexOf(')', startIndex);

  let result = [];
  while (startIndex > 0) {
    if (endIndex < 0) {
      break;
    }
    result.push(str.substring(startIndex + 1, endIndex));
    startIndex = str.indexOf('(', endIndex);
    endIndex = str.indexOf(')', startIndex);
  }
  console.log(result.join(', '));
}
extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');

// 05. Aggregate table
function aggregateTable(input) {
  let sum = 0;
  let towns = [];
  for (let i of input) {
    [town, price] = i.split('|').filter((x) => x !== '');
    towns.push(town.trim());
    sum += Number(price);
  }
  console.log(towns.join(', '));
  console.log(sum);
}
aggregateTable([
  '| Sofia           | 300',
  '| Veliko Tarnovo  | 500',
  '| Yambol          | 275',
]);

// 06. Restaurant bill
function bill(input) {
  let items = input.filter((x, i) => i % 2 == 0);
  let sum = input
    .filter((x, i) => i % 2 == 1)
    .map(Number)
    .reduce((a, b) => a + b);
  console.log(`You purchased ${items.join(', ')} for a total sum of ${sum}`);
}
bill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80', 'Lasagna', '5.69']);

// 07. Usernames
function usernames(inputEmails) {
  let results = [];
  for (let email of inputEmails) {
    let [alias, domain] = email.split('@');
    let username = alias + '.';
    let domainParts = domain.split('.');
    domainParts.forEach((p) => (username += p[0]));
    results.push(username);
  }
  console.log(results.join(', '));
}
usernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);

// 08. Censorship
function censorship(text, bannedWords) {
  for (let word of bannedWords) {
    let startIndex = text.indexOf(word);
    while (startIndex > 0) {
      let wordLength = word.length;
      text = text.replace(word, '-'.repeat(wordLength));
      startIndex = text.indexOf(word, startIndex);
    }
  }
  console.log(text);
}
censorship('roses are red, violets are blue', [', violets are', 'red']);

// 09. Escaping
function escaping(items) {
  // first declare prototype function to use it below in the code
  String.prototype.htmlEscape = function () {
    return this.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
  let result = '<ul>\n';
  for (let item of items) {
    result += ` <li>${item.htmlEscape()}</li>\n`;
  }
  result += '</ul>';
  console.log(result);
}
escaping(['<b>unescaped text</b>', 'normal text']);

// 10. Match all words
function matchAllWords(text) {
  let words = text.match(/\w+/g);
  console.log(words.join('|'));
}
matchAllWords(
  'A Regular Expression needs to have the global flag in order to match all occurrences in the text'
);

// 11. Email validation
function emailValidation(email) {
  let regex = new RegExp(/\b[A-Za-z0-9]+@[a-z]+\.[a-z]+\b/);
  if (regex.test(email)) {
    console.log('Valid');
  } else {
    console.log('Invalid');
  }
}
emailValidation('valid@email.bg');
emailValidation('invalid@emai1.bg');

// 12. Expression split
function expressionSplit(input) {
  let regex = /[\s,;()\t.]+/;
  let result = input.split(regex);
  result.forEach((element) => {
    console.log(element);
  });
}
expressionSplit('let sum = 4 * 4,b = "wow";');

// 13. Match dates
function matchDates(items) {
  let re = new RegExp('\\b([0-9]{1,2})-([A-Z][a-z]{2,2})-([0-9]{4,4})\\b', 'g');
  let whole = re.exec(items);
  while (whole) {
    console.log(
      `${whole[0]} (Day: ${whole[1]}, Month: ${whole[2]}, Year: ${whole[3]})`
    );
    whole = re.exec(items);
  }
}
matchDates([
  'I am born on 30-Dec-1994.',
  'This is not date: 512-Jan-1996.',
  'My father is born on the 29-Jul-1955.',
]);

// 14. Employee data
function employeeData(inputs) {
  let re = new RegExp('^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([a-zA-Z0-9 -]+)$');

  for (let input of inputs) {
    let correct = re.exec(input);
    if (correct) {
      [name, position, salary] = [correct[1], correct[3], correct[2]];
      console.log(`Name: ${name}\nPosition: ${position}\nSalary: ${salary}`);
    }
  }
}
employeeData([
  'Isacc - 1000 - CEO',
  'Ivan - 500 - Employee',
  'Peter - 500 - Employee',
]);

// 15. Form filler
function formFiller(name, email, phone, dataArr) {
  dataArr.forEach((line) => {
    line = line.replace(/<![a-zA-Z]+!>/g, name);
    line = line.replace(/<@[a-zA-Z]+@>/g, email);
    line = line.replace(/<\+[a-zA-Z]+\+>/g, phone);
    console.log(line);
  });
}
formFiller('Pesho', 'pesho@softuni.bg', '90-60-90', [
  'Hello, <!username!>!',
  'Welcome to your Personal profile.',
  'Here you can modify your profile freely.',
  'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
  'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
  'Your current phone number is: <+number+>. Would you like to change that? (Y/N)',
]);

// 16. Match multiplication
function performMultiplications(text) {
  // callback function takes as first parameter the whole match then each capturing group
  text = text.replace(
    /(-?\d+)\s*\*\s*(-?\d+(\.\d+)?)/g,
    (match, num1, num2) => Number(num1) * Number(num2)
  );
  console.log(text);
}
performMultiplications(
  'My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).'
);

// 20. Ends with
function checkEndsWith(str, s) {
  let len = s.length * -1;
  if (str.substr(len) === s) {
    return true;
  } else {
    return false;
  }
}
console.log(checkEndsWith('This sentence ends with fun?', 'fun?'));

// 21. Capitalize words
function capitalizeWords(str) {
  str = str
    .split(' ')
    .map((e) => e.toLowerCase())
    .map((e) => e[0].toUpperCase() + e.substr(1))
    .join(' ');
  console.log(str);
}
capitalizeWords('Was that Easy? tRY thIs onE for SiZe!');

// 22. Capture numbers
function captureNumbers(arr) {
  let result = arr.join('').match(/\d+/g);
  console.log(result.join(' '));
}
captureNumbers([
  'The300',
  'What is that?',
  'I think it’s the 3rd movie.',
  'Lets watch it at 22:45',
]);

// 23. Find variables
function findVariables(str) {
  let result = [];
  // create non-capturing group with ?: because we dont need _ in the final result
  let re = /\b(?:_([A-Za-z0-9)]+))\b/g;
  let validItem = re.exec(str);
  while (validItem) {
    result.push(validItem[1]);
    validItem = re.exec(str);
  }
  console.log(result.join(','));
}
findVariables('The _id and _age variables are both integers.');

// 24. Find occurencies
function wordOccurrences(text, item) {
  let re = new RegExp(`\\b${item}\\b`, 'gi');
  let result = text.match(re);
  if (result) {
    console.log(result.length);
  } else {
    console.log(0);
  }
}
wordOccurrences(
  'How do you plan on achieving that? How? How can you even think of that?',
  'how'
);
wordOccurrences(
  "There was one. Therefore I bought it. I wouldn't buy it otherwise.",
  'there'
);
wordOccurrences(
  "The was one. efore I bought it. I wouldn't buy it otherwise.",
  'there'
);

// 25. Extract links
function extractLinks(data) {
  let re = /(www)\.([a-zA-Z0-9-]+)(\.[a-z]+)+/g;
  let result = re.exec(data);
  while (result) {
    console.log(result[0]);
    result = re.exec(data);
  }
}
extractLinks([
  'Join WebStars now for free, at www.web-stars.com',
  'You can also support our partners:',
  'Internet - www.internet.com',
  'WebSpiders - www.webspiders101.com',
  'Sentinel - www.sentinel.-ko',
]);

// 26. Secret data
function secretData(data) {
  // ?= is positive lookahead in regex which assure that our match will be followed by something but that thing will not be included in the match
  let client = /\*[A-Z][A-Za-z]*(?=\s|$)/g;
  let phone = /\+[0-9-]{10}(?=\s|$)/g;
  let id = /![a-zA-Z0-9]+(?=\s|\t|$)/g;
  let base = /_[0-9A-Za-z]+(?=\s|$)/g;
  for (let line of data) {
    console.log(
      line
        .replace(client, (m) => '|'.repeat(m.length))
        .replace(phone, (m) => '|'.repeat(m.length))
        .replace(id, (m) => '|'.repeat(m.length))
        .replace(base, (m) => '|'.repeat(m.length))
    );
  }
}
secretData([
  'Agent *Ivankov was in the room when it all happened.',
  'The person in the room was heavily armed.',
  'Agent *Ivankov had to act quick in order.',
  'He picked up his phone and called some unknown number.',
  'I think it was +555-49-796',
  "I can't really remember...",
  ',He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
  'Then after that he disappeared from my sight.',
  'As if he vanished in the shadows.',
  'A moment, shorter than a second, later, I saw the person flying off the top floor.',
  "I really don't know what happened there.",
  'This is all I saw, that night.',
  'I cannot explain it myself...',
]);
