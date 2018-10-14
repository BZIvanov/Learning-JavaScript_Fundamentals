function race(arr) {
    let pilots = arr.shift().split(' ').filter(x => x !== '')

    let commands = (function() {
        function join(name) {
            if(!pilots.includes(name)) {
                pilots.push(name)
            }
        }
        function crash(name) {
            if(pilots.includes(name)) {
                let index = pilots.indexOf(name)
                pilots.splice(index, 1)
            }
        }
        function pit(name) {
            if(pilots.includes(name)) {
                let index = pilots.indexOf(name)
                if(index !== pilots.length - 1) {
                    pilots.splice(index, 1)
                    pilots.splice(index + 1, 0, name)
                }
            }
        }
        function overtake(name) {
            if(pilots.includes(name)) {
                let index = pilots.indexOf(name)
                if(index !== 0) {
                    pilots.splice(index, 1)
                    pilots.splice(index - 1, 0, name)
                }
            }
        }
        
        return { join, crash, pit, overtake }
    })()

    for(let row of arr) {
        let [action, pilot] = row.split(' ').filter(x => x !== '')
        action = action.toLowerCase()
        commands[action](pilot)
    }

    console.log(pilots.join(' ~ '))
}

race(["Vetel Hamilton Raikonnen Botas Slavi",
"Pit Hamilton",
"Overtake LeClerc",
"Join Ricardo",
"Crash Botas",
"Overtake Ricardo",
"Overtake Ricardo",
"Overtake Ricardo",
"Crash Slavi"])
