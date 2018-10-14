function hungryProgrammer(list, commands) {
    let mealsEaten = 0;

    let processor = (function () {
        
        let Serve = function() {
            if(list.length > 0) {
                let item = list.pop();
                console.log(`${item} served!`);
            }
        }
        let Add = function(meal) {
            if(meal) {
                list.unshift(meal)
            }
        }
        let Shift = function(a, b) {
            if(list.length > 0) {
                a = +a
                b = +b
                if(a !== b && (a < list.length && a >= 0) && (b < list.length && b >= 0)) {
                    if(a < b) {
                        let firstMeal = list.splice(a, 1)[0]
                        let secondMeal = list.splice(b - 1, 1)[0]
                        list.splice(a, 0, secondMeal)
                        list.splice(b, 0, firstMeal)
                    } else {
                        let firstMeal = list.splice(b, 1)[0]
                        let secondMeal = list.splice(a - 1, 1)[0]
                        list.splice(b, 0, secondMeal)
                        list.splice(a, 0, firstMeal)
                    }
                }
            }
        }
        let Eat = function() {
            if(list.length > 0) {
                let item = list.shift();
                console.log(`${item} eaten`);
                mealsEaten++;
            }
        }
        let Consume = function(a, b) {
            let firstIndex = Number(a);
            let secondIndex = Number(b);
            if (list[firstIndex] != undefined && list[secondIndex] != undefined) {
                let count = secondIndex - firstIndex + 1;
                list.splice(firstIndex, count);
                console.log("Burp!");
                mealsEaten += count
            }
        }

        return { Serve, Add, Shift, Eat, Consume }
    })()


    for(let comm of commands) {
        let [action, first, second] = comm.split(' ');
        if(action === 'End') {
            break;
        }
        processor[action](first, second)
    }

    if(list.length !== 0) {
        console.log(`Meals left: ${list.join(', ')}`);
    } else {
        console.log('The food is gone');
    }

    console.log(`Meals eaten: ${mealsEaten}`)
}

hungryProgrammer(['chicken', 'steak', 'eggs'],
['Serve', 'Eat', 'End', 'Consume 0 1']);