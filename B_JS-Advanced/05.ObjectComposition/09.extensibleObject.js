function extensibleObject() {
    let myObj = {};

    myObj.extend = function (source) {
        for (let prop in source) {
            if (typeof source[prop] === 'function') {
                Object.getPrototypeOf(myObj)[prop] = source[prop]
            } else {
                myObj[prop] = source[prop]
            } 
        }
    };

    return myObj;
}

let obj1 = extensibleObject();

let obj2 = {
    name: "Mariq",
    age: 26,
    greet: () => {
        console.log("Hello");
    }
}
obj1.extend(obj2)

// here we can see the greet function is now attached to the global Object
let obj3 = {}
obj3.greet()

console.log(obj1)