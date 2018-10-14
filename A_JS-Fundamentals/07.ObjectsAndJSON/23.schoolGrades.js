function schoolGrades(arr) {
    let school = {};

    for(let row of arr) {
        let tokens = row.split(', ')
        let name = tokens[0].substring(14);
        let grade = tokens[1].substring(7);
        let score = +tokens[2].substring(33)
        if(score < 3) {
            continue;
        }

        if(!school.hasOwnProperty(grade)) {
            school[grade] = { 'list': [], 'AVG': [] }
        }
        school[grade]['list'].push(name);
        school[grade]['AVG'].push(score);
    }

    let sortedGrades = Object.keys(school).sort((a, b) => {
        return +a - +b;
    })

    for(let sg of sortedGrades) {
        let n = +sg + 1;
        let averageGRade = school[sg]['AVG'].reduce((acc, cur) => {
            return (acc + cur)
        }, 0) / school[sg]['AVG'].length;
        console.log(`${n} Grade`)
        console.log(`List of students: ${school[sg]['list'].join(', ')}`);
        console.log(`Average annual grade from last year: ${averageGRade.toFixed(2)}`)

        console.log()
    }
}

schoolGrades(['Student name: Mark, Grade: 8, Graduated with an average score: 4.75',
'Student name: Ethan, Grade: 9, Graduated with an average score: 5.66',
'Student name: George, Grade: 8, Graduated with an average score: 2.83',
'Student name: Steven, Grade: 10, Graduated with an average score: 4.20',
'Student name: Joey, Grade: 9, Graduated with an average score: 4.90',
'Student name: Angus, Grade: 11, Graduated with an average score: 2.90',
'Student name: Bob, Grade: 11, Graduated with an average score: 5.15',
'Student name: Daryl, Grade: 8, Graduated with an average score: 5.95',
'Student name: Bill, Grade: 9, Graduated with an average score: 6.00',
'Student name: Philip, Grade: 10, Graduated with an average score: 5.05',
'Student name: Peter, Grade: 11, Graduated with an average score: 4.88',
'Student name: Gavin, Grade: 10, Graduated with an average score: 4.00']);