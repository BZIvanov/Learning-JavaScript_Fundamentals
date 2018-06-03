function extractLinks(data) {
    let re = /(www)\.([a-zA-Z0-9-]+)(\.[a-z]+)+/g
    let result = re.exec(data)
    while(result) {
        console.log(result[0])
        result = re.exec(data)
    }
}

extractLinks(["Join WebStars now for free, at www.web-stars.com",
    "You can also support our partners:",
    "Internet - www.internet.com",
    "WebSpiders - www.webspiders101.com",
    "Sentinel - www.sentinel.-ko"])