function addRemove(arr) {
    let result = []
    let value = 1
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === "add") {
            result.push(value)
            value++
        }
        if(arr[i] === "remove") {
            result.pop()
            value++
        }
    }
    if(result.length === 0) {
        console.log("Empty")
        return
    }
    console.log(result.join('\n'))
}

addRemove(["add", "add", "add", "add"])
//addRemove(["add", "add", "remove", "add", "add"])
//addRemove(["remove", "remove", "remove"])
//addRemove(["remove", "add", "add", "add"])