const user = {
  firstName: 'Iva',
};

const greeter = function (text, punct) {
  console.log(text + ' ' + this.firstName + punct);
};

// apply is very similar to call, the difference is that we provide array as function parameters instead of comma separated values
// the first parameter is what we will use for this and then array is provided which will be the parameters for the function
greeter.apply(user, ['Hello', '!']); // Hello Iva!
