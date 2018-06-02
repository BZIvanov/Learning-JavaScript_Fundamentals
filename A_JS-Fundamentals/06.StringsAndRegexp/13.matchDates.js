function matchDates(items) {
    let re = new RegExp("\\b([0-9]{1,2})-([A-Z][a-z]{2,2})-([0-9]{4,4})\\b", "g")
    let whole = re.exec(items)
    while(whole) {
        console.log(`${whole[0]} (Day: ${whole[1]}, Month: ${whole[2]}, Year: ${whole[3]})`)
        whole = re.exec(items)
    }
}

matchDates(['I am born on 30-Dec-1994.',
'This is not date: 512-Jan-1996.',
'My father is born on the 29-Jul-1955.'])