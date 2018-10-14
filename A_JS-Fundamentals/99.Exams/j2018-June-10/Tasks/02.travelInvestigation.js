function travelInvestigation(arr) {
    let separator = arr[1];
    let companies = arr[0].split(separator).filter(x => x !== "").map(z => z.trim());
    arr.splice(0, 2);
    arr = arr.map(x => x.toLowerCase());


    let positiveMatch = [];
    let negativeMatch = [];
    for(let i = 0; i < arr.length; i++) {

        let allIncludes = true;
        for(let company of companies) {
            if(arr[i].indexOf(company) < 0) {
                allIncludes = false;
            }
        }

        if(allIncludes) {
            positiveMatch.push(arr[i]);
        } else {
            negativeMatch.push(arr[i]);
        }
    }

    if(positiveMatch.length > 0) {
        console.log('ValidSentences')
        for(let i = 0; i < positiveMatch.length; i++) {
            console.log(`${i + 1}. ${positiveMatch[i]}`)
        }
    }
    if(positiveMatch.length > 0 && negativeMatch.length > 0) {
        console.log('='.repeat(30))
    }
    if(negativeMatch.length > 0) {
        console.log('InvalidSentences')
        for(let i = 0; i < negativeMatch.length; i++) {
            console.log(`${i + 1}. ${negativeMatch[i]}`)
        }
    }
}

travelInvestigation(["bulgariatour@, minkatrans@, koftipochivkaltd",
"@,",
"Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
"dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
"someone continues as no "])