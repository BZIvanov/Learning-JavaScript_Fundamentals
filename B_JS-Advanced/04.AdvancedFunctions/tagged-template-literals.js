// tagged template example
const color = 'green';
const food = 'chocolate';

const quote = about`I love ${food} and also my favorite color is ${color} I like the nature`;

function about(text, ...vars) {
  console.log(text); // [ 'I love ', ' and also my favorite color is ', ' I like the nature' ]
  console.log(text.length); // 3
  console.log(vars); // [ 'chocolate', 'green' ]

  const awesomeText = text.map((item, index) => {
    return `<p>${item} <span class="fav">${vars[index] || 'nishto'}</span></p>`;
  });
  return awesomeText.join('');
}

console.log(quote);
// <p>I love  <span class="fav">chocolate</span></p><p> and also my favorite color is  <span class="fav">green</span></p><p> I like the nature <span class="fav">nishto</span></p>
