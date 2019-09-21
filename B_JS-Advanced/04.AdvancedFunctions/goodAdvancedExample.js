const human = (() => {
    const humanActions = {
        walk: (speed, easing, direction) => {
            console.log(`${speed} ${easing} ${direction}`);
        },
        run: (speed, easing, direction) => {
            console.log(`${speed} ${easing} ${direction}`);
        },
        climb: (speed, easing, direction, height) => {
            console.log(`${speed} ${easing} ${direction} ${height}`);
        }
    }

    const speed = 1;
    const easing = "InOut";

    const result = {};

    Object.keys(humanActions).forEach((key) => {
        result[key] = function () {
            const arr = [speed, easing];

            for(let i = 0; i < arguments.length; i += 1) {
                arr.push(arguments[i]);
            }

            const action = humanActions[key];
            
            action.apply(null, arr);
        };
    });

    return result;

    // return {
    //     walk: (direction) => { obj.walk(speed, easing, direction); },
    //     run: (direction) => { obj.run(speed, easing, direction); },
    //     climb: (direction, heigth) => { obj.climb(speed, easing, direction, heigth); }
    // };
})();

human.run("Home");
human.climb("Up", 1000);
