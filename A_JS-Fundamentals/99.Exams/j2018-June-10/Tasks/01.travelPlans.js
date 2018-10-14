function travelPlans(arr) {
    let professions = {
        specialised: ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'],
        average: ['Driving', 'Managing', 'Fishing', 'Gardening'],
        clumsy: ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing']
    }

    let specialisedCount = 0;
    let clumsyCount = 0;
    let goldObtained = 0;

    for(let row of arr) {
        let [activity, reward] = row.split(' : ')
        reward = +reward

        if(professions.specialised.includes(activity) && reward >= 200) {
            specialisedCount++
            goldObtained += addGold(reward - (reward * 0.2))
            if(specialisedCount % 2 === 0) {
                goldObtained += addGold(200)
            }
        } else if(professions.average.includes(activity)) {
            goldObtained += addGold(reward);
        } else if(professions.clumsy.includes(activity)) {
            clumsyCount++
            if(clumsyCount % 2 === 0) {
                goldObtained += addGold(reward - (reward * 0.05))
            } else if(clumsyCount % 3 === 0) {
                goldObtained += addGold(reward - (reward * 0.1))
            } else {
                goldObtained += addGold(reward)
            }
        }
    }

    function addGold(gold) {
        return gold
    }

    if(goldObtained < 1000) {
        console.log(`Final sum: ${goldObtained.toFixed(2)}`)
        console.log(`Mariyka need to earn ${(1000 - goldObtained).toFixed(2)} gold more to continue in the next task.`)
    } else {
        console.log(`Final sum: ${goldObtained.toFixed(2)}`)
        console.log(`Mariyka earned ${(goldObtained - 1000).toFixed(2)} gold more.`)
    }
}

travelPlans(["Programming : 500", "Driving : 243", "Singing : 100", "Cooking : 199"])
