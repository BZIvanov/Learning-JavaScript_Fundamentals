class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;    // string
        this.destination = destination;     // string
        this.budget = budget;    //number
        this.kids = {};
    }

    get numberOfChildren() {
        let numberKids = 0;
        for (let g in this.kids) {
            numberKids += this.kids[g].length;
        }
        return numberKids;
    }

    registerChild(name, grade, budget) {
        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = []; // check in case is empty array with grade only
        }
        
        for (let i = 0; i < this.kids[grade].length; i++) {
            let kidName = this.kids[grade][i].split("-").filter(x => x !== "")[0];
            if (kidName === name) {
                return `${name} is already in the list for this ${this.destination} vacation.`;
            }
        }
        
        if (this.budget > budget) {
            return `'${name}'s money is not enough to go on vacation to ${this.destination}.'`;
        }

        this.kids[grade].push(`${name}-${budget}`);
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (this.kids[grade]) {
            for (let i = 0; i < this.kids[grade].length; i++) {
                let kidName = this.kids[grade][i].split("-").filter(x => x !== "")[0];
                if (kidName === name) {
                    this.kids[grade].splice(i, 1);
                    return this.kids[grade];
                }
            }
        }
        return `We couldn't find ${name} in ${grade} grade.`;
    }

    toString() {
        if (this.numberOfChildren > 0) {
            let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
            let sortedGrades = [...Object.keys(this.kids)].sort((a, b) => +a - +b);
            for (let sortG of sortedGrades) {
                if (this.kids[sortG].length > 0) {
                    result += `Grade: ${sortG}\n`;
                    for (let i = 0; i < this.kids[sortG].length; i++) {
                        result += `${i+1}. ${this.kids[sortG][i]}\n`;
                    }
                }
            }
            return result;
        } else {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
    }
}

let vacation = new Vacation('Miss. Elizabeth', 'The bahamas', 390);

console.log(vacation.registerChild("Pesho", 5, 390));    // skip
console.log(vacation.registerChild("Pesho", 5, 410));
console.log(vacation.numberOfChildren);
console.log(vacation.registerChild("Pesho", 6, 420));
console.log(vacation.registerChild("Pesho", 6, 390));    // skip
console.log(vacation.registerChild("Kiro", 4, 400));           //removed
console.log(vacation.registerChild("Lily", 4, 1000));
console.log(vacation.registerChild("Ema", 1,  200));     // skip
console.log(vacation.registerChild("Ema", 2,  500));
console.log(vacation.registerChild("Ema", 7,  500));           //removed
console.log(vacation.registerChild("Ema", 7,  800));    // dupl
console.log(vacation.registerChild("Emaa", 7,  800)); 

console.log(vacation.removeChild("Kiro", 4));
console.log(vacation.removeChild("Ema", 7)); 

console.log(vacation.numberOfChildren);

console.log(vacation.removeChild("Lily", 4)); 

console.log("------------");
console.log(vacation.toString());
