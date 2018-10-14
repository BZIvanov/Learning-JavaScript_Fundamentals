function solve(arr) {
    let countryRegex = /[A-Z][a-z]+[A-Z]/;
    let townRexgex = /([\d]{3})(\.[\d]+)?/g;
    let start = +arr[0];
    let end = +arr[1];
    let piece = arr[2];
    let text = arr.slice(3)[0];

    let country = text.match(countryRegex)[0]
    country = country.substring(0, start) + piece + country.substring(end + 1, country.length - 1) + country[country.length - 1].toLowerCase()

    let town = text.match(townRexgex).map((x) => String.fromCharCode(Math.ceil(+x))).map((z, i) => {
        if(i === 0) {
            return z.toUpperCase()
        } else {
            return z
        }
    }).join('');

    console.log(`${country} => ${town}`);
}

solve(["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"])
