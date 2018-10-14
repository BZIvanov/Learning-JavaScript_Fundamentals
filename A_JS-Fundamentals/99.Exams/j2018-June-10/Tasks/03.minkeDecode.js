function minkeDecode(arr) {
    let regexCountry = /\b[A-Z]{1}[a-z]+[A-Z]{1}\b/g;
    let regexCity = /(?<!\d)([0-9]{3}(?!\d)(\.\d+)?)/g
    let start = +arr[0]
    let end = +arr[1]
    let piece = arr[2]
    arr.splice(0, 3)

    let country = arr[0].match(regexCountry)[0]
    let realCountry = country.substring(0, start) + piece + country.substring(end + 1, country.length - 1) + country[country.length - 1].toLowerCase()
    
    let town = arr[0].match(regexCity).map(x => String.fromCharCode(Math.ceil(+x))).map((el, index) => {
        if(index === 0) {
            return el.toUpperCase()
        } else {
            return el
        }
    }).join('')
    
    console.log(`${realCountry} => ${town}`)
}

minkeDecode(["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"])
minkeDecode(["1", "4","loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"])
