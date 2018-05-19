function wordsUppercase(str) {
    console.log(str.toUpperCase().split(/\W+/).filter(x => x !== '').join(", "))
}
  
wordsUppercase('Hi, how are you?');

