function usernames(input){
    let usernames = new Set();
    for(let name of input){
        usernames.add(name);
    }
    function nameCompare(a, b) {
        return a.length - b.length || a.localeCompare(b);
    }
    console.log([...usernames].sort(nameCompare).join('\n'));
}

usernames(["Ashton", "Kutcher", "Ariel", "Lilly", "Keyden", "Aizen", "Billy", "Braston"])