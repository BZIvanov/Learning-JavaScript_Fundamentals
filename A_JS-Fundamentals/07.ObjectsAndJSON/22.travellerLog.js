function travlellersLog(arr) {
    let people = {};

    for(let row of arr) {
        if(row.indexOf('visited') === -1) {
            addIncome(row);
        } else {
            visitLandmark(row);
        }
    }

    function addIncome(r) {
        let [name, income] = r.split(' gets ');
        if(!people.hasOwnProperty(name)) {
            people[name] = { "money": 0 };
        }
        people[name]['money'] += +income;
    }

    function visitLandmark(r) {
        let [name, leftA] = r.split(' visited the ');
        let [landmark, leftB] = leftA.split(' in ');
        let [country, price] = leftB.split(' - ');
        
        if(!people.hasOwnProperty(name)) {
            people[name] = {};
            people[name]['money'] = 0;
            console.log(`Not enough money to visit ${landmark}`);
            return;
        }

        if(people[name][country] && people[name][country].includes(landmark)) {
            return;
        }

        if(people[name]['money'] < +price) {
            console.log(`Not enough money to visit ${landmark}`);
            return;
        }

        if(!people[name].hasOwnProperty(country)) {
            people[name][country] = [];
        }
        people[name][country] = people[name][country].filter((x) => x !== landmark);
        people[name][country].push(landmark);
        people[name]['money'] -= +price
    }

    //print the results
    let sortedPeople = Object.keys(people).sort((a, b) => {
        let c1 = Object.keys(people[a]).length;
        let c2 = Object.keys(people[b]).length;
        return c2 - c1;
    })

    for(let person of sortedPeople) {
        console.log(`${person} visited ${Object.keys(people[person]).length - 1} countries and has ${people[person]['money']} money left`);
        let sortedCountries = Object.keys(people[person]).filter((x) => x !== 'money').sort((a, b) => {
            let m1 = people[person][a].length;
            let m2 = people[person][b].length;
            return m2 - m1
        });
        for(let sc of sortedCountries) {
            console.log(`- ${sc} -> ${people[person][sc].length} landmarks`);
            people[person][sc] = people[person][sc].sort();
            for(let lm of people[person][sc]) {
                console.log(`-- ${lm}`);
            }
        }
    }
}

travlellersLog(['Peter gets 100', 
'Peter visited the StatueOfLiberty in USA - 50', 
'Bill gets 250', 
'Tim visited the ChristTheRedeemer in Brazil - 150', 
'Bill gets 400', 
'Bill visited the MountFuji in Japan - 600', 
'Bill visited the TeatroAmazonas in Brazil - 50',
'Bill gets 150', 
'Bill visited the ChristTheRedeemer in Brazil - 150', 
'Tim gets 500', 
'Bill visited the StatueOfLiberty in USA - 440', 
'Tim visited the StatueOfLiberty in USA - 440',
 'Maria gets 650', 
'Maria visited the StatueOfLiberty in USA - 440', 
'Maria visited the CapeCod in USA - 100']);