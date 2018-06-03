function captureNumbers(arr) {
    let result = arr.join('').match(/\d+/g)
    console.log(result.join(' '))
}

captureNumbers(["The300", "What is that?", "I think it’s the 3rd movie.", "Lets watch it at 22:45"])