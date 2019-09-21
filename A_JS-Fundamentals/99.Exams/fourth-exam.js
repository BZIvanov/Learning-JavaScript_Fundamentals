// 01. Travel plans
function travelPlans(arr) {
    let professions = {
        specialised: ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'],
        average: ['Driving', 'Managing', 'Fishing', 'Gardening'],
        clumsy: ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing']
    };

    let specialisedCount = 0;
    let clumsyCount = 0;
    let goldObtained = 0;

    for (let row of arr) {
        let [activity, reward] = row.split(' : ');
        reward = +reward;

        if (professions.specialised.includes(activity) && reward >= 200) {
            specialisedCount++;
            goldObtained += addGold(reward - (reward * 0.2));
            if (specialisedCount % 2 === 0) {
                goldObtained += addGold(200);
            }
        } else if (professions.average.includes(activity)) {
            goldObtained += addGold(reward);
        } else if (professions.clumsy.includes(activity)) {
            clumsyCount++;
            if (clumsyCount % 2 === 0) {
                goldObtained += addGold(reward - (reward * 0.05));
            } else if (clumsyCount % 3 === 0) {
                goldObtained += addGold(reward - (reward * 0.1));
            } else {
                goldObtained += addGold(reward);
            }
        }
    }

    function addGold(gold) {
        return gold;
    }

    if (goldObtained < 1000) {
        console.log(`Final sum: ${goldObtained.toFixed(2)}`);
        console.log(`Mariyka need to earn ${(1000 - goldObtained).toFixed(2)} gold more to continue in the next task.`);
    } else {
        console.log(`Final sum: ${goldObtained.toFixed(2)}`);
        console.log(`Mariyka earned ${(goldObtained - 1000).toFixed(2)} gold more.`);
    }
}
travelPlans(["Programming : 500", "Driving : 243", "Singing : 100", "Cooking : 199"]);

// 02. Travel investigation
function travelInvestigation(arr) {
    let separator = arr[1];
    let companies = arr[0].split(separator).filter(x => x !== "").map(z => z.trim());
    arr.splice(0, 2);
    arr = arr.map(x => x.toLowerCase());

    let positiveMatch = [];
    let negativeMatch = [];
    for (let i = 0; i < arr.length; i++) {
        let allIncludes = true;
        for (let company of companies) {
            if (arr[i].indexOf(company) < 0) {
                allIncludes = false;
            }
        }

        if (allIncludes) {
            positiveMatch.push(arr[i]);
        } else {
            negativeMatch.push(arr[i]);
        }
    }

    if (positiveMatch.length > 0) {
        console.log('ValidSentences');
        for (let i = 0; i < positiveMatch.length; i++) {
            console.log(`${i + 1}. ${positiveMatch[i]}`);
        }
    }
    if (positiveMatch.length > 0 && negativeMatch.length > 0) {
        console.log('='.repeat(30));
    }
    if (negativeMatch.length > 0) {
        console.log('InvalidSentences')
        for (let i = 0; i < negativeMatch.length; i++) {
            console.log(`${i + 1}. ${negativeMatch[i]}`);
        }
    }
}
travelInvestigation(["bulgariatour@, minkatrans@, koftipochivkaltd",
"@,",
"Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
"dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
"someone continues as no "]);

// 03. Minke decode
function minkeDecode(arr) {
    let regexCountry = /\b[A-Z]{1}[a-z]+[A-Z]{1}\b/g;
    let regexCity = /(?<!\d)([0-9]{3}(?!\d)(\.\d+)?)/g;
    let start = +arr[0];
    let end = +arr[1];
    let piece = arr[2];
    arr.splice(0, 3);

    let country = arr[0].match(regexCountry)[0];
    let realCountry = country.substring(0, start) + piece + country.substring(end + 1, country.length - 1) + country[country.length - 1].toLowerCase();
    
    let town = arr[0].match(regexCity).map(x => String.fromCharCode(Math.ceil(+x))).map((el, index) => {
        if (index === 0) {
            return el.toUpperCase();
        } else {
            return el;
        }
    }).join('');
    
    console.log(`${realCountry} => ${town}`);
}
minkeDecode(["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]);
minkeDecode(["1", "4","loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"]);

// 04. Travel time
function travelTime(arr) {
    let offers = {};

    for (let row of arr) {
        let [country, town, price] = row.split(' > ');
        town = town[0].toUpperCase() + town.substring(1);
        price = +price;
        
        if (!offers.hasOwnProperty(country)) {
            offers[country] = {};
        }
        if (!offers[country].hasOwnProperty(town)) {
            offers[country][town] = Number.POSITIVE_INFINITY;
        }
        if (offers[country][town] > price) {
            offers[country][town] = price;
        }
    }

    let sortedKeys = Object.keys(offers).sort();
    for (let key of sortedKeys) {
        let nestedKeys = Object.keys(offers[key]).sort((a, b) => {
            return offers[key][a] - offers[key][b];
        });

        let printRow = key + ' -> ';
        for (let nestKey of nestedKeys) {
            printRow += nestKey + ' -> ' + offers[key][nestKey] + ' ';
        }
        console.log(printRow.trim());
    }
}
travelTime(["Bulgaria > Sofia > 500",
"Bulgaria > Sopot > 800",
"France > Paris > 2000",
"Albania > Tirana > 1000",
"Bulgaria > Sofia > 200",
"Bulgaria > Vraca > 100"]);
