function templateFormat(input) {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n'
    result += "<quiz>\n"
    for(let i = 0; i < input.length; i += 2) {
        result += dataFiller(input[i], input[i + 1])
    }
    result += "</quiz>"

    function dataFiller(q, a) {
        let dataTags = `    <question>\n        ${q}\n  </question>\n`
        dataTags += `    <answer>\n        ${a}\n  </answer>\n`
        return dataTags
    }

    console.log(result)
}

templateFormat(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
)