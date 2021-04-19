const h2 = document.getElementsByTagName('h2')[0];

// previousSubling will match not only elements, but also text nodes
// and because in the html file we have new line and tabulation before the h2 element the textContent of this text node will be '\n    '
console.log(h2.previousSibling);

// here we ask for specifically html element which will result in h1
console.log(h2.previousElementSibling);
