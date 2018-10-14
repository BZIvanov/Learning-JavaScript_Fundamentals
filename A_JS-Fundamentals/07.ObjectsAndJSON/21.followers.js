function followers(arr) {
    let totalUsers = 0;
    let people = {};

    for(let row of arr) {
        if(row.indexOf('Welcome, ') > -1) {
            registerUser(row);
        } else {
            followUser(row);
        }
    }

    function registerUser(item) {
        let newUser = item.split(' ').filter(x => x !== "")[1];
        if(!people.hasOwnProperty(newUser)) {
            people[newUser] = { following: 0, followers: 0, list: [] };
            totalUsers++;
        }
    }

    function followUser(item) {
        let [f1, f2] = item.split(' followed ');
        if(f1 === f2) {
            return;
        }
        let p1 = people.hasOwnProperty(f1);
        let p2 = people.hasOwnProperty(f2);
        if(p1 === false || p2 === false) {
            return;
        }
        if(people[f2]['list'].includes(f1)) {
            return
        }
        
        people[f2]['followers']++;
        people[f2]['list'].push(f1);
        people[f1]['following']++;
    }

    //print the results
    console.log(`Total users registered: ${totalUsers}`);
    let sortedUsers = Object.keys(people).sort((a, b) => {
        return people[b]['followers'] - people[a]['followers'] || b.localeCompare(a) || people[a]['following'] - people[b]['following'];
    })

    let order = 0;
    for(let user of sortedUsers) {
        order++;
        if(order === 1) {
            console.log(`1. ${user} : ${people[user]['following']} following, ${people[user]['followers']} followers`);
            let sortedList = people[user]['list'].sort()
            for(let name of sortedList) {
                console.log(`*  ${name}`)
            }
        } else {
            console.log(`${order}. ${user} : ${people[user]['following']} following, ${people[user]['followers']} followers`);
        }
    }
}

followers(['Welcome, JennaMarbles',
    'JennaMarbles followed Zoella',
    'Welcome, AmazingPhil',
    'JennaMarbles followed AmazingPhil',
    'Welcome, Zoella',
    'Welcome, JennaMarbles',
    'Zoella followed AmazingPhil',
    'Christy followed Zoella',
    'Zoella followed Christy',
    'Welcome, JacksGap',
    'JacksGap followed JennaMarbles',
    'Welcome, PewDiePie',
    'Welcome, Zoella']);