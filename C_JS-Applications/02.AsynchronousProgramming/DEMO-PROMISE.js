//------------------------------PROMISE----------------------------------------

// Promise example with data obtained from ajax call
let example = new Promise(function (resolve, reject) {
  let data = $.ajax({
    method: 'GET',
    url: 'https://api.github.com/users/BZIvanov/repos',
  });

  resolve(data);
  reject(data);
});

example
  .then(function (result) {
    console.log(result);
  })
  .catch(function (result) {
    console.log(result);
  });

//-------->>>>>>>>>>>

// Very simple example of how Promise functions work.
/*  1. the promise has parameter which is function with 2 parameters and they are another 2 functions.
    2. the function in Promise body for success has to be called as the first parameter, same for second parameter
*/
let simpleExamp = new Promise((resolve, reject) => {
  resolve('hi');
  reject('sorry');
});
/*  3. in *then* the anonymous function is the resolve function returned from the Promise and the result parameter is the parameter given to the resolve function. In this example its "hi"
    4. in *catch* the anonymous function is the reject function returned from the Promise and the oops parameter is the parameter given to the reject function. In this example its "sorry"
*/
simpleExamp
  .then((result) => {
    console.log(result);
  })
  .catch((oops) => {
    console.log(oops);
  });

//--------->>>>>>>>>

/* 
*catch* method is syntax sugar which is the same as *then* with first parameter undefined and the second is the actual error.
Below you can see how we catch the error in the *then* method by simply setting the first parameter to undefined
*/
let sugar = new Promise(function (resolve, reject) {
  let data = $.ajax({
    method: 'GET',
    url: 'https://api.github.com/users/NOT-EXISTING-USER/repos',
  });

  resolve(data);
  reject(data);
});

sugar.then(undefined, function (result) {
  console.log(result.status);
});

/*
the above example means we can also pass bothe functions in as parameters to the *then* method and the first function will handle success and the second reject 
*/
let anotherSugar = new Promise(function (resolve, reject) {
  let data = $.ajax({
    method: 'GET',
    url: 'https://api.github.com/users/BZIvanov/repos',
  });

  resolve(data);
  reject(data);
});

anotherSugar.then(
  function (resultSuccess) {
    console.log('successs');
  },
  function (resultFail) {
    console.log(resultFail.status);
  }
);

//--------->>>>>>>>>>>

// Below is example with Vanilla JavaScript of how to make Promise in function
function getAsync(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      // check for status code because status code with 4xx is considered success and we usually expect it as fail
      if (xhr.status < 400) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

getAsync('https://api.github.com/users/BZIvanov/repos')
  .then(function (result) {
    console.log('vanilla JS success');
  })
  .catch(function (result) {
    console.log('vanilla JS: ' + result);
  });
