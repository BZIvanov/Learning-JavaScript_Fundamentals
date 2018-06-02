function escaping(items) {
    // first declare prototype function to use it below in the code
    String.prototype.htmlEscape = function() {
        return this.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    }
      
    let result = "<ul>\n"
    for(let item of items) {
        result += ` <li>${item.htmlEscape()}</li>\n`
    }
    result += "</ul>"

    console.log(result)
}

escaping(['<b>unescaped text</b>', 'normal text'])