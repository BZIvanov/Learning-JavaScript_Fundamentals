function multiplicationTable(n) {
    let html = '<table border="1">\n';
    for(let row = 0; row <= n; row++) {
        html += "   <tr>";
        for(let col = 0; col <= n; col++) {
            if (row === 0 && col === 0) {
                html += "<th>x</th>";
                continue;
            }
            if(row === 0) {
                html += `<th>${col}</th>`;
            } else if (col === 0) {
                html += `<th>${row}</th>`;
            } else {
                html += `<td>${row * col}</td>`;
            }
        }
        html += "</tr>\n";
    }
    html += "</table>";

    return html;
}

console.log(multiplicationTable(5));
