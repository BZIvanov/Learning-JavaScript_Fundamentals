function kompot(arr) {
    let kompots = {
        cherry: 0,
        plum: 0,
        peach: 0,
        other: 0
    };
    for(let row of arr) {
        let [fruit, weight] = row.split(' ').filter((x) => x !== '');
        if(fruit === 'cherry') {
            kompots['cherry'] += (+weight * 1000);
        } else if(fruit === 'plum') {
            kompots['plum'] += (+weight * 1000);
        } else if(fruit === 'peach') {
            kompots['peach'] += (+weight * 1000);
        } else {
            kompots['other'] += (+weight * 1000);
        }
    }

    console.log(`Cherry kompots: ${Math.floor(kompots['cherry'] / (25 * 9))}`)
    console.log(`Peach kompots: ${Math.floor(kompots['peach'] / (2.5 * 140))}`)
    console.log(`Plum kompots: ${Math.floor(kompots['plum'] / (10 * 20))}`)
    console.log(`Rakiya liters: ${((kompots['other'] * 0.2) / 1000).toFixed(2)}`)
}

// kompot(['cherry 1.2',
//     'peach 2.2', 
//     'plum 5.2',
//     'peach 0.1',
//     'cherry 0.2', 
//     'cherry 5.0',
//     'plum 10',
//     'cherry 20.0',
//     'papaya 20'
// ])

kompot(['apple 6',
    'peach 25.158',
    'strawberry 0.200',
    'peach 0.1',
    'banana 1.55',
    'cherry 20.5',
    'banana 16.8',
    'grapes 205.65',
    'watermelon 20.54'
])