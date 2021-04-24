const myDiv = document.getElementById('my-div');

// we have access to our data attributes with the dataset element property
console.log(myDiv.dataset);

console.log(myDiv.dataset.someInfo);

myDiv.dataset.myThirdItem = 'This is how we generate new data set items.';
