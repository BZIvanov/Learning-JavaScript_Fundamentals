function employeeData(inputs) {
    let re = new RegExp("^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([a-zA-Z0-9 -]+)$")
    
    for(let input of inputs) {
        let correct = re.exec(input)
        if(correct) {
            [name, position, salary] = [correct[1], correct[3], correct[2]]
            console.log(`Name: ${name}\nPosition: ${position}\nSalary: ${salary}`)
        }
    }
}

employeeData(['Isacc - 1000 - CEO',
'Ivan - 500 - Employee',
'Peter - 500 - Employee'])