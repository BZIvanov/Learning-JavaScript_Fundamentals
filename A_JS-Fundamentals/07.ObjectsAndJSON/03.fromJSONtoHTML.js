function scoreToHTML(data) {
    data = JSON.parse(data)
    
    let html = "<table>\n"
    html += "   <tr>"
    for(let key in data[0]) {
        html += `<th>${htmlEscape(key)}</th>`
    }
    html += "</tr>\n"

    for(let d of data) {
        html += "   <tr>"
        for(let key in d) {
            html += `<td>${htmlEscape(d[key])}</td>`
        }
        html += "</tr>\n"
    }
    html += "</table>"

    function htmlEscape(text) {
        text = new String(text);
        let symbols = { '"': '&quot;', '&': '&amp;', "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => symbols[ch]);
    }

    return html
}

console.log(scoreToHTML('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"}, {"Name":"Gosho","Age":18,"City":"Plovdiv"}, {"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]'))