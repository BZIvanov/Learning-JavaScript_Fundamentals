function JSONTable(arr) {
    let result = "<table>\n"
    for(let row of arr) {
        row = JSON.parse(row)
        result += "\t<tr>\n"
        for(let key in row) {
            result += `\t\t<td>${htmlEscape(row[key])}</td>\n`
        }
        result += "\t<tr>\n"
    }
    result += "</table>"

    function htmlEscape(str) {
        str = new String(str)
        return str.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    }

    console.log(result)
}

JSONTable(['{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}'])