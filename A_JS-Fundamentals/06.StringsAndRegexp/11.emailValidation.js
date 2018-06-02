function emailValidation(email) {
    let regex = new RegExp(/\b[A-Za-z0-9]+@[a-z]+\.[a-z]+\b/)
    if(regex.test(email)) {
        console.log("Valid")
    } else {
        console.log("Invalid")
    }
}

emailValidation("valid@email.bg")
emailValidation("invalid@emai1.bg")